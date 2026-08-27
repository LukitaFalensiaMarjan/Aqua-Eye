// ============================================================
// AQUA EYE — Scenario Definitions (Mock Data)
// ============================================================

import type { Scenario, AIVisionDetection } from '../types';

const safeDetections: AIVisionDetection[] = [
  {
    id: 'det-s1',
    label: 'Plastic Debris',
    labelIndonesian: 'Sampah Plastik',
    confidence: 0.72,
    x: 320, y: 180, width: 60, height: 45,
    priority: 'low',
  },
];

const cautionDetections: AIVisionDetection[] = [
  {
    id: 'det-c1',
    label: 'Plastic Debris',
    labelIndonesian: 'Sampah Plastik',
    confidence: 0.91,
    x: 150, y: 200, width: 80, height: 60,
    priority: 'medium',
  },
  {
    id: 'det-c2',
    label: 'Floating Object',
    labelIndonesian: 'Objek Mengapung',
    confidence: 0.87,
    x: 420, y: 150, width: 100, height: 70,
    priority: 'medium',
  },
  {
    id: 'det-c3',
    label: 'Hazardous Object',
    labelIndonesian: 'Objek Berbahaya',
    confidence: 0.78,
    x: 280, y: 320, width: 65, height: 55,
    priority: 'high',
  },
];

const dangerDetections: AIVisionDetection[] = [
  {
    id: 'det-d1',
    label: 'Human',
    labelIndonesian: 'Manusia',
    confidence: 0.94,
    x: 300, y: 160, width: 70, height: 120,
    priority: 'high',
  },
  {
    id: 'det-d2',
    label: 'Large Debris',
    labelIndonesian: 'Sampah Besar',
    confidence: 0.91,
    x: 100, y: 250, width: 120, height: 80,
    priority: 'high',
  },
  {
    id: 'det-d3',
    label: 'Hazardous Object',
    labelIndonesian: 'Objek Berbahaya',
    confidence: 0.88,
    x: 500, y: 200, width: 90, height: 65,
    priority: 'high',
  },
  {
    id: 'det-d4',
    label: 'Chemical Waste',
    labelIndonesian: 'Limbah Kimia',
    confidence: 0.82,
    x: 200, y: 350, width: 110, height: 50,
    priority: 'high',
  },
];

export const scenarios: Record<string, Scenario> = {
  safe: {
    key: 'safe',
    label: 'Safe Scenario',
    sensorData: {
      turbidity: 18,
      ph: 7.2,
      temperature: 27.6,
      tds: 240,
      depth: 0.85,
    },
    visualHazard: {
      level: 'low',
      score: 15,
      description: 'Sedikit sampah terlihat di permukaan, tidak ada ancaman signifikan.',
    },
    detections: safeDetections,
    assessment: {
      score: 18,
      risk: 'safe',
      factors: [
        { parameter: 'Turbidity', status: 'NORMAL', value: '18 NTU', contribution: 2 },
        { parameter: 'Kedalaman', status: 'NORMAL', value: '0.85 m', contribution: 7 },
        { parameter: 'Visual Hazard', status: 'NORMAL', value: 'LOW', contribution: 3 },
        { parameter: 'pH', status: 'NORMAL', value: '7.2', contribution: 1 },
        { parameter: 'TDS', status: 'NORMAL', value: '240 ppm', contribution: 2 },
        { parameter: 'Temperature', status: 'NORMAL', value: '27.6°C', contribution: 1 },
      ],
      reasoning: 'Semua parameter lingkungan berada dalam batas aman. Kondisi sungai memungkinkan operasi pembersihan dengan prosedur standar.',
      recommendations: [
        'Operasi dapat dilakukan dengan prosedur standar',
        'Gunakan APD dasar (sepatu boots, sarung tangan)',
        'Pastikan komunikasi radio aktif',
        'Lakukan pengecekan berkala selama operasi',
      ],
    },
  },

  caution: {
    key: 'caution',
    label: 'Caution Scenario',
    sensorData: {
      turbidity: 68,
      ph: 6.7,
      temperature: 28.3,
      tds: 482,
      depth: 1.82,
    },
    visualHazard: {
      level: 'medium',
      score: 65,
      description: 'Beberapa objek terdeteksi di permukaan air, termasuk sampah dan objek yang berpotensi berbahaya.',
    },
    detections: cautionDetections,
    assessment: {
      score: 52,
      risk: 'caution',
      factors: [
        { parameter: 'Turbidity', status: 'HIGH', value: '68 NTU', contribution: 9 },
        { parameter: 'Kedalaman', status: 'HIGH', value: '1.82 m', contribution: 15 },
        { parameter: 'Visual Hazard', status: 'HIGH', value: 'MEDIUM', contribution: 13 },
        { parameter: 'pH', status: 'NORMAL', value: '6.7', contribution: 2 },
        { parameter: 'TDS', status: 'MODERATE', value: '482 ppm', contribution: 5 },
        { parameter: 'Temperature', status: 'NORMAL', value: '28.3°C', contribution: 1 },
      ],
      reasoning: 'Tingkat kekeruhan tinggi dan terdapat indikasi bahaya visual. Kondisi membutuhkan verifikasi lapangan sebelum personel memasuki area sungai.',
      recommendations: [
        'Gunakan APD lengkap',
        'Hindari masuk langsung ke sungai jika memungkinkan',
        'Gunakan alat bantu pengangkatan sampah',
        'Lakukan verifikasi kondisi lapangan sebelum operasi',
        'Pastikan tim medis standby di lokasi',
      ],
    },
  },

  danger: {
    key: 'danger',
    label: 'Danger Scenario',
    sensorData: {
      turbidity: 156,
      ph: 5.8,
      temperature: 30.1,
      tds: 920,
      depth: 2.65,
    },
    visualHazard: {
      level: 'high',
      score: 90,
      description: 'Banyak objek berbahaya terdeteksi, termasuk limbah kimia dan manusia di area sungai.',
    },
    detections: dangerDetections,
    assessment: {
      score: 78,
      risk: 'danger',
      factors: [
        { parameter: 'Turbidity', status: 'HIGH', value: '156 NTU', contribution: 20 },
        { parameter: 'Kedalaman', status: 'CRITICAL', value: '2.65 m', contribution: 22 },
        { parameter: 'Visual Hazard', status: 'CRITICAL', value: 'HIGH', contribution: 18 },
        { parameter: 'pH', status: 'HIGH', value: '5.8', contribution: 6 },
        { parameter: 'TDS', status: 'CRITICAL', value: '920 ppm', contribution: 9 },
        { parameter: 'Temperature', status: 'MODERATE', value: '30.1°C', contribution: 2 },
      ],
      reasoning: 'PERINGATAN: Kondisi sungai berbahaya. Tingkat kekeruhan sangat tinggi, kedalaman melebihi threshold operasi, terdeteksi objek berbahaya pada permukaan air, dan konsentrasi zat terlarut sangat tinggi. Personel DILARANG memasuki area sungai tanpa evaluasi lebih lanjut.',
      recommendations: [
        'DILARANG memasuki sungai tanpa evaluasi tambahan',
        'Aktifkan protokol keselamatan tingkat tinggi',
        'Gunakan APD lengkap termasuk pelampung',
        'Siapkan tim SAR standby',
        'Gunakan peralatan mekanis untuk pembersihan',
        'Laporkan kondisi ke koordinator lapangan',
      ],
    },
  },
};

export const defaultScenario = 'caution';
