// ============================================================
// AQUA EYE — AQUA SAFE Index Calculation (Prototype Logic)
// ============================================================
// Skor pada prototype menggunakan simulasi logika penilaian untuk demonstrasi konsep.
// Bobot final ditentukan berdasarkan validasi lapangan.

import type { WaterSensorData, VisualHazard, SafetyAssessment, SafetyFactor, RiskLevel } from '../types';

// Weight configuration (prototype only — 3 active sensors)
const WEIGHTS = {
  ph: 0.35,
  tds: 0.40,
  temperature: 0.10,
  visualHazard: 0.15,
} as const;

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

function getParameterStatus(normalized: number): 'MINIM' | 'SEDANG' | 'CUKUP TINGGI' | 'TINGGI' {
  if (normalized <= 25) return 'MINIM';
  if (normalized <= 50) return 'SEDANG';
  if (normalized <= 75) return 'CUKUP TINGGI';
  return 'TINGGI';
}

function getRiskLevel(score: number): RiskLevel {
  if (score <= 33) return 'safe';
  if (score <= 66) return 'caution';
  return 'danger';
}

// ─── Sensor Conclusion (ASI-E) ────────────────────────────────
function generateSensorConclusion(risk: RiskLevel, sensorData: WaterSensorData): string {
  if (risk === 'safe') {
    return `Indikasi resiko lingkungan minim berdasarkan parameter sensor yang diukur. Nilai pH ${sensorData.ph} berada dalam rentang wajar, TDS ${sensorData.tds} ppm masih di bawah ambang batas, dan suhu air ${sensorData.temperature}°C tergolong kondusif untuk operasi.`;
  }
  if (risk === 'caution') {
    const notes: string[] = [];
    if (sensorData.ph < 6.5 || sensorData.ph > 8.5) notes.push(`pH ${sensorData.ph} mendekati batas tidak ideal`);
    if (sensorData.tds > 400) notes.push(`TDS ${sensorData.tds} ppm mendekati ambang peringatan`);
    if (sensorData.temperature > 30 || sensorData.temperature < 20) notes.push(`suhu ${sensorData.temperature}°C di luar rentang wajar`);
    const noteText = notes.length > 0 ? ` (${notes.join('; ')})` : '';
    return `Indikasi resiko lingkungan cukup tinggi berdasarkan parameter sensor yang diukur${noteText}. Beberapa parameter memerlukan pemantauan lebih lanjut sebelum operasi dilanjutkan.`;
  }
  // danger
  const issues: string[] = [];
  if (sensorData.ph < 6 || sensorData.ph > 9) issues.push(`pH ${sensorData.ph} di luar rentang aman`);
  if (sensorData.tds > 700) issues.push(`TDS ${sensorData.tds} ppm melebihi batas operasional`);
  if (sensorData.temperature > 33) issues.push(`suhu ${sensorData.temperature}°C sangat tinggi`);
  const issueText = issues.length > 0 ? `: ${issues.join(', ')}` : '';
  return `Indikasi resiko lingkungan tinggi berdasarkan parameter sensor yang diukur${issueText}. Kualitas air saat ini tidak memenuhi standar keselamatan operasi. Evaluasi menyeluruh diperlukan sebelum personel memasuki area.`;
}

// ─── Visual Conclusion (VHA) ──────────────────────────────────
function generateVisualConclusion(visualHazard: VisualHazard): string {
  if (visualHazard.level === 'low') {
    return `Indikasi resiko lingkungan minim berdasarkan hasil analisis kamera yang didapat. Tidak ditemukan objek berbahaya signifikan di permukaan air. Area terlihat relatif bersih dan kondusif untuk aktivitas pemantauan.`;
  }
  if (visualHazard.level === 'medium') {
    return `Indikasi resiko lingkungan cukup tinggi berdasarkan visual kamera yang didapat. Terdeteksi beberapa objek mencurigakan di permukaan air dengan skor bahaya visual ${visualHazard.score}/100. Diperlukan verifikasi lapangan sebelum tim memasuki area sungai.`;
  }
  // high
  return `Indikasi resiko lingkungan tinggi berdasarkan visual kamera yang didapat. AI Vision mendeteksi objek berbahaya dengan skor hazard ${visualHazard.score}/100. ${visualHazard.description} Personel diinstruksikan untuk tidak mendekati area tanpa prosedur keselamatan lengkap.`;
}

// ─── APD Recommendations ─────────────────────────────────────
function generateAPDRecommendations(risk: RiskLevel, visualHazard: VisualHazard): string[] {
  if (risk === 'safe' && visualHazard.level === 'low') {
    return [
      'Helm keselamatan standar (warna putih/kuning)',
      'Sepatu boots karet anti-slip',
      'Sarung tangan karet tipis',
      'Rompi pelampung tipe III (jika bekerja di dekat tepian)',
      'Pakaian lengan panjang berbahan tahan air ringan',
    ];
  }
  if (risk === 'danger' || visualHazard.level === 'high') {
    return [
      'Helm keselamatan full-face shield (kelas A)',
      'Pakaian hazmat tahan kimia (kategori B)',
      'Sepatu safety boots waterproof kelas II',
      'Sarung tangan nitril tebal + pelindung lengan',
      'Rompi pelampung tipe I (self-inflating, beban berat)',
      'Respirator/masker full-face filter kimia',
      'Tali pengaman + harness body untuk operasi dekat air',
      'Komunikasi radio waterproof (wajib aktif)',
    ];
  }
  // caution
  return [
    'Helm keselamatan standar dengan chin-strap',
    'Pakaian lengan panjang tahan air (water-resistant)',
    'Sarung tangan karet tebal tahan kimia ringan',
    'Rompi pelampung tipe II (standar operasional)',
    'Sepatu boots karet anti-slip waterproof',
    'Kacamata pelindung (safety goggles)',
    'Masker N95 sebagai pencegahan kontaminasi',
  ];
}

// ─── Operation Guidelines ────────────────────────────────────
function generateOperationGuidelines(risk: RiskLevel, visualHazard: VisualHazard): string[] {
  if (risk === 'safe' && visualHazard.level === 'low') {
    return [
      'Lakukan briefing singkat sebelum operasi dimulai',
      'Operasikan AUV dengan kecepatan normal (mode standar)',
      'Ambil sampel air di 3 titik berbeda untuk validasi data sensor',
      'Pantau kondisi cuaca setiap 30 menit',
      'Dokumentasi visual setiap 15 menit dengan kamera',
      'Operasi dapat dilanjutkan hingga shift berikutnya',
    ];
  }
  if (risk === 'danger' || visualHazard.level === 'high') {
    return [
      'HENTIKAN semua operasi lapangan sampai kondisi dievaluasi ulang',
      'Aktifkan Protokol Darurat Level 3 dan lapor ke koordinator segera',
      'Gunakan hanya peralatan mekanis/robotik untuk pengambilan data',
      'Pasang tanda peringatan (safety barrier) di area radius 50m',
      'Siapkan tim SAR dalam posisi standby di lokasi terdekat',
      'Lakukan evakuasi warga dari bantaran sungai jika diperlukan',
      'Rekam semua kondisi dengan kamera untuk dokumentasi insiden',
      'Hubungi BPBD dan instansi terkait jika ancaman menyebar',
    ];
  }
  // caution
  return [
    'Lakukan verifikasi kondisi lapangan sebelum tim memasuki area',
    'Operasikan AUV dalam mode lambat (reduced speed, mode waspada)',
    'Batasi jumlah personel di area sungai (maks. 3 orang)',
    'Pastikan 1 personel selalu dalam posisi standby di darat',
    'Ambil sampel air tambahan untuk uji laboratorium',
    'Perbarui status kondisi setiap 15 menit ke koordinator',
    'Siapkan rencana evakuasi cepat jika kondisi memburuk',
  ];
}

// ─── Legacy Reasoning (untuk backward compat) ────────────────
function generateReasoning(
  risk: RiskLevel,
  factors: SafetyFactor[],
  sensorData: WaterSensorData,
  visualHazard: VisualHazard
): string {
  const highFactors = factors.filter(f => f.status === 'CUKUP TINGGI' || f.status === 'TINGGI');

  if (risk === 'safe') {
    return 'Semua parameter lingkungan berada dalam batas wajar. Kondisi sungai memungkinkan operasi pembersihan dengan prosedur standar.';
  }

  if (risk === 'danger') {
    const reasons: string[] = [];
    if (sensorData.ph < 6 || sensorData.ph > 9) reasons.push('pH air di luar batas wajar');
    if (sensorData.tds > 800) reasons.push('konsentrasi zat terlarut sangat tinggi');
    if (visualHazard.level === 'high') reasons.push('terdeteksi objek berbahaya pada permukaan air');
    return `PERINGATAN: Kondisi sungai berisiko tinggi. ${reasons.join(', ')}. Personel diinstruksikan tidak memasuki area sungai tanpa evaluasi lebih lanjut.`;
  }

  // caution
  const cautionReasons: string[] = [];
  if (highFactors.some(f => f.parameter === 'TDS')) cautionReasons.push('konsentrasi TDS mendekati batas peringatan');
  if (highFactors.some(f => f.parameter === 'Visual Hazard')) cautionReasons.push('terdapat indikasi bahaya visual');
  if (highFactors.some(f => f.parameter === 'pH')) cautionReasons.push('pH air tidak ideal');
  if (cautionReasons.length === 0) cautionReasons.push('beberapa parameter mendekati batas peringatan');

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
  return [
    'Gunakan APD lengkap',
    'Hindari masuk langsung ke sungai jika memungkinkan',
    'Gunakan alat bantu pengangkatan sampah',
    'Lakukan verifikasi kondisi lapangan sebelum operasi',
    'Pastikan tim medis standby di lokasi',
  ];
}

// ─── Main Export ──────────────────────────────────────────────
export function calculateAquaSafeIndex(
  sensorData: WaterSensorData,
  visualHazard: VisualHazard
): SafetyAssessment {
  const phNorm = normalizePH(sensorData.ph);
  const tdsNorm = normalizeTDS(sensorData.tds);
  const tempNorm = normalizeTemperature(sensorData.temperature);
  const visualNorm = visualHazard.score;

  const score = Math.round(
    phNorm * WEIGHTS.ph +
    tdsNorm * WEIGHTS.tds +
    tempNorm * WEIGHTS.temperature +
    visualNorm * WEIGHTS.visualHazard
  );

  const risk = getRiskLevel(score);

  const factors: SafetyFactor[] = [
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
      parameter: 'Suhu',
      status: getParameterStatus(tempNorm),
      value: `${sensorData.temperature}°C`,
      contribution: Math.round(tempNorm * WEIGHTS.temperature),
    },
    {
      parameter: 'Visual Hazard',
      status: getParameterStatus(visualNorm),
      value: visualHazard.level.toUpperCase(),
      contribution: Math.round(visualNorm * WEIGHTS.visualHazard),
    },
  ];

  const recommendations = generateRecommendations(risk, factors);
  const reasoning = generateReasoning(risk, factors, sensorData, visualHazard);
  const sensorConclusion = generateSensorConclusion(risk, sensorData);
  const visualConclusion = generateVisualConclusion(visualHazard);
  const apdRecommendations = generateAPDRecommendations(risk, visualHazard);
  const operationGuidelines = generateOperationGuidelines(risk, visualHazard);

  return {
    score, risk, factors, reasoning, recommendations,
    sensorConclusion, visualConclusion, apdRecommendations, operationGuidelines,
  };
}

export function getSensorStatus(param: string, value: number): { status: string; level: RiskLevel } {
  switch (param) {
    case 'ph':
      if (value >= 6.5 && value <= 8.5) return { status: 'MINIM', level: 'safe' };
      if (value >= 5.5 && value <= 9.5) return { status: 'CUKUP TINGGI', level: 'caution' };
      return { status: 'TINGGI', level: 'danger' };
    case 'temperature':
      if (value >= 20 && value <= 30) return { status: 'MINIM', level: 'safe' };
      if (value >= 15 && value <= 35) return { status: 'CUKUP TINGGI', level: 'caution' };
      return { status: 'TINGGI', level: 'danger' };
    case 'tds':
      if (value <= 300) return { status: 'MINIM', level: 'safe' };
      if (value <= 600) return { status: 'CUKUP TINGGI', level: 'caution' };
      return { status: 'TINGGI', level: 'danger' };
    default:
      return { status: 'MINIM', level: 'safe' };
  }
}
