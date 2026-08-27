// ============================================================
// AQUA EYE — AQUA SAFE Index Calculation (Prototype Logic)
// ============================================================
// Skor pada prototype menggunakan simulasi logika penilaian untuk demonstrasi konsep.
// Bobot final ditentukan berdasarkan validasi lapangan.

import type { WaterSensorData, VisualHazard, SafetyAssessment, SafetyFactor, RiskLevel } from '../types';

// Weight configuration (prototype only)
const WEIGHTS = {
  turbidity: 0.25,
  depth: 0.25,
  ph: 0.15,
  tds: 0.10,
  temperature: 0.05,
  visualHazard: 0.20,
} as const;

// Normalize turbidity (0 NTU = 0 risk, 200+ NTU = 100 risk)
function normalizeTurbidity(value: number): number {
  return Math.min(100, (value / 200) * 100);
}

// Normalize depth (0m = 0 risk, 3m+ = 100 risk)
function normalizeDepth(value: number): number {
  return Math.min(100, (value / 3) * 100);
}

// Normalize pH (7.0 = 0 risk, deviation from 7 increases risk)
function normalizePH(value: number): number {
  const deviation = Math.abs(value - 7.0);
  return Math.min(100, (deviation / 3) * 100);
}

// Normalize TDS (0 ppm = 0 risk, 1000+ ppm = 100 risk)
function normalizeTDS(value: number): number {
  return Math.min(100, (value / 1000) * 100);
}

// Normalize temperature (25°C = 0 risk, deviation increases risk)
function normalizeTemperature(value: number): number {
  const deviation = Math.abs(value - 25);
  return Math.min(100, (deviation / 15) * 100);
}

function getParameterStatus(normalized: number): 'NORMAL' | 'MODERATE' | 'HIGH' | 'CRITICAL' {
  if (normalized <= 25) return 'NORMAL';
  if (normalized <= 50) return 'MODERATE';
  if (normalized <= 75) return 'HIGH';
  return 'CRITICAL';
}

function getRiskLevel(score: number): RiskLevel {
  if (score <= 33) return 'safe';
  if (score <= 66) return 'caution';
  return 'danger';
}

export function calculateAquaSafeIndex(
  sensorData: WaterSensorData,
  visualHazard: VisualHazard
): SafetyAssessment {
  const turbidityNorm = normalizeTurbidity(sensorData.turbidity);
  const depthNorm = normalizeDepth(sensorData.depth);
  const phNorm = normalizePH(sensorData.ph);
  const tdsNorm = normalizeTDS(sensorData.tds);
  const tempNorm = normalizeTemperature(sensorData.temperature);
  const visualNorm = visualHazard.score;

  const score = Math.round(
    turbidityNorm * WEIGHTS.turbidity +
    depthNorm * WEIGHTS.depth +
    phNorm * WEIGHTS.ph +
    tdsNorm * WEIGHTS.tds +
    tempNorm * WEIGHTS.temperature +
    visualNorm * WEIGHTS.visualHazard
  );

  const risk = getRiskLevel(score);

  const factors: SafetyFactor[] = [
    {
      parameter: 'Turbidity',
      status: getParameterStatus(turbidityNorm),
      value: `${sensorData.turbidity} NTU`,
      contribution: Math.round(turbidityNorm * WEIGHTS.turbidity),
    },
    {
      parameter: 'Kedalaman',
      status: getParameterStatus(depthNorm),
      value: `${sensorData.depth} m`,
      contribution: Math.round(depthNorm * WEIGHTS.depth),
    },
    {
      parameter: 'Visual Hazard',
      status: getParameterStatus(visualNorm),
      value: visualHazard.level.toUpperCase(),
      contribution: Math.round(visualNorm * WEIGHTS.visualHazard),
    },
    {
      parameter: 'pH',
      status: getParameterStatus(phNorm),
      value: `${sensorData.ph}`,
      contribution: Math.round(phNorm * WEIGHTS.ph),
    },
    {
      parameter: 'TDS',
      status: getParameterStatus(tdsNorm),
      value: `${sensorData.tds} ppm`,
      contribution: Math.round(tdsNorm * WEIGHTS.tds),
    },
    {
      parameter: 'Temperature',
      status: getParameterStatus(tempNorm),
      value: `${sensorData.temperature}°C`,
      contribution: Math.round(tempNorm * WEIGHTS.temperature),
    },
  ];

  const recommendations = generateRecommendations(risk, factors);
  const reasoning = generateReasoning(risk, factors, sensorData, visualHazard);

  return { score, risk, factors, reasoning, recommendations };
}

function generateReasoning(
  risk: RiskLevel,
  factors: SafetyFactor[],
  sensorData: WaterSensorData,
  visualHazard: VisualHazard
): string {
  const highFactors = factors.filter(f => f.status === 'HIGH' || f.status === 'CRITICAL');

  if (risk === 'safe') {
    return 'Semua parameter lingkungan berada dalam batas aman. Kondisi sungai memungkinkan operasi pembersihan dengan prosedur standar.';
  }

  if (risk === 'danger') {
    const reasons: string[] = [];
    if (sensorData.turbidity > 100) reasons.push('tingkat kekeruhan sangat tinggi');
    if (sensorData.depth > 2) reasons.push('kedalaman melebihi threshold operasi');
    if (visualHazard.level === 'high') reasons.push('terdeteksi objek berbahaya pada permukaan air');
    if (sensorData.ph < 6 || sensorData.ph > 9) reasons.push('pH air di luar batas normal');
    if (sensorData.tds > 800) reasons.push('konsentrasi zat terlarut sangat tinggi');

    return `PERINGATAN: Kondisi sungai berbahaya. ${reasons.join(', ')}. Personel DILARANG memasuki area sungai tanpa evaluasi lebih lanjut.`;
  }

  // caution
  const cautionReasons: string[] = [];
  if (highFactors.some(f => f.parameter === 'Turbidity')) cautionReasons.push('tingkat kekeruhan tinggi');
  if (highFactors.some(f => f.parameter === 'Visual Hazard')) cautionReasons.push('terdapat indikasi bahaya visual');
  if (highFactors.some(f => f.parameter === 'Kedalaman')) cautionReasons.push('kedalaman air cukup tinggi');
  if (cautionReasons.length === 0) cautionReasons.push('beberapa parameter mendekati batas waspada');

  const joined = cautionReasons.join(' dan ');
  return `${joined.charAt(0).toUpperCase() + joined.slice(1)}. Kondisi membutuhkan verifikasi lapangan sebelum personel memasuki area sungai.`;
}

function generateRecommendations(risk: RiskLevel, _factors: SafetyFactor[]): string[] {
  if (risk === 'safe') {
    return [
      'Operasi dapat dilakukan dengan prosedur standar',
      'Gunakan APD dasar (sepatu boots, sarung tangan)',
      'Pastikan komunikasi radio aktif',
      'Lakukan pengecekan berkala selama operasi',
    ];
  }

  if (risk === 'danger') {
    return [
      'DILARANG memasuki sungai tanpa evaluasi tambahan',
      'Aktifkan protokol keselamatan tingkat tinggi',
      'Gunakan APD lengkap termasuk pelampung',
      'Siapkan tim SAR standby',
      'Gunakan peralatan mekanis untuk pembersihan',
      'Laporkan kondisi ke koordinator lapangan',
    ];
  }

  // caution
  return [
    'Gunakan APD lengkap',
    'Hindari masuk langsung ke sungai jika memungkinkan',
    'Gunakan alat bantu pengangkatan sampah',
    'Lakukan verifikasi kondisi lapangan sebelum operasi',
    'Pastikan tim medis standby di lokasi',
  ];
}

export function getSensorStatus(param: string, value: number): { status: string; level: RiskLevel } {
  switch (param) {
    case 'turbidity':
      if (value <= 25) return { status: 'NORMAL', level: 'safe' };
      if (value <= 80) return { status: 'TINGGI', level: 'caution' };
      return { status: 'BAHAYA', level: 'danger' };
    case 'ph':
      if (value >= 6.5 && value <= 8.5) return { status: 'NORMAL', level: 'safe' };
      if (value >= 5.5 && value <= 9.5) return { status: 'WASPADA', level: 'caution' };
      return { status: 'BAHAYA', level: 'danger' };
    case 'temperature':
      if (value >= 20 && value <= 30) return { status: 'NORMAL', level: 'safe' };
      if (value >= 15 && value <= 35) return { status: 'WASPADA', level: 'caution' };
      return { status: 'BAHAYA', level: 'danger' };
    case 'tds':
      if (value <= 300) return { status: 'NORMAL', level: 'safe' };
      if (value <= 600) return { status: 'WASPADA', level: 'caution' };
      return { status: 'BAHAYA', level: 'danger' };
    case 'depth':
      if (value <= 1.0) return { status: 'RENDAH', level: 'safe' };
      if (value <= 2.0) return { status: 'TINGGI', level: 'caution' };
      return { status: 'BAHAYA', level: 'danger' };
    default:
      return { status: 'NORMAL', level: 'safe' };
  }
}
