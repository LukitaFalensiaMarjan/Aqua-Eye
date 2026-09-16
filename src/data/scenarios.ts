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
      ph: 7.2,
      temperature: 27.6,
      tds: 240,
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
        { parameter: 'pH', status: 'MINIM', value: '7.2', contribution: 1 },
        { parameter: 'TDS', status: 'MINIM', value: '240 ppm', contribution: 2 },
        { parameter: 'Suhu', status: 'MINIM', value: '27.6°C', contribution: 1 },
        { parameter: 'Visual Hazard', status: 'MINIM', value: 'LOW', contribution: 3 },
      ],
      reasoning: 'Semua parameter lingkungan berada dalam batas wajar. Kondisi sungai memungkinkan operasi pembersihan dengan prosedur standar.',
      recommendations: [
        'Operasi dapat dilakukan dengan prosedur standar',
        'Gunakan APD dasar (sepatu boots, sarung tangan)',
        'Pastikan komunikasi radio aktif',
        'Lakukan pengecekan berkala selama operasi',
      ],
      sensorConclusion: 'Indikasi resiko lingkungan minim berdasarkan parameter sensor yang diukur. Nilai pH 7.2 berada dalam rentang wajar, TDS 240 ppm masih di bawah ambang batas, dan suhu air 27.6°C tergolong kondusif untuk operasi.',
      visualConclusion: 'Indikasi resiko lingkungan minim berdasarkan hasil analisis kamera yang didapat. Tidak ditemukan objek berbahaya signifikan di permukaan air. Area terlihat relatif bersih dan kondusif untuk aktivitas pemantauan.',
      apdRecommendations: [
        'Helm keselamatan standar (warna putih/kuning)',
        'Sepatu boots karet anti-slip',
        'Sarung tangan karet tipis',
        'Rompi pelampung tipe III (jika bekerja di dekat tepian)',
        'Pakaian lengan panjang berbahan tahan air ringan',
      ],
      operationGuidelines: [
        'Lakukan briefing singkat sebelum operasi dimulai',
        'Operasikan AUV dengan kecepatan normal (mode standar)',
        'Ambil sampel air di 3 titik berbeda untuk validasi data sensor',
        'Pantau kondisi cuaca setiap 30 menit',
        'Dokumentasi visual setiap 15 menit dengan kamera',
        'Operasi dapat dilanjutkan hingga shift berikutnya',
      ],
    },
  },

  caution: {
    key: 'caution',
    label: 'Caution Scenario',
    sensorData: {
      ph: 6.4,
      temperature: 24.5,
      tds: 500,
    },
    visualHazard: {
      level: 'medium',
      score: 65,
      description: 'Beberapa objek terdeteksi di permukaan air, termasuk sampah dan objek yang berpotensi berbahaya.',
    },
    detections: cautionDetections,
    assessment: {
      score: 36.5,
      risk: 'caution',
      factors: [
        { parameter: 'pH', status: 'MINIM', value: '6.7', contribution: 2 },
        { parameter: 'TDS', status: 'SEDANG', value: '482 ppm', contribution: 5 },
        { parameter: 'Suhu', status: 'MINIM', value: '28.3°C', contribution: 1 },
        { parameter: 'Visual Hazard', status: 'CUKUP TINGGI', value: 'MEDIUM', contribution: 13 },
      ],
      reasoning: 'Terdapat indikasi bahaya visual. Kondisi membutuhkan verifikasi lapangan sebelum personel memasuki area sungai.',
      recommendations: [
        'Gunakan APD lengkap',
        'Hindari masuk langsung ke sungai jika memungkinkan',
        'Gunakan alat bantu pengangkatan sampah',
        'Lakukan verifikasi kondisi lapangan sebelum operasi',
        'Pastikan tim medis standby di lokasi',
      ],
      sensorConclusion: 'Indikasi resiko lingkungan cukup tinggi berdasarkan parameter sensor yang diukur (TDS 482 ppm mendekati ambang peringatan). Beberapa parameter memerlukan pemantauan lebih lanjut sebelum operasi dilanjutkan.',
      visualConclusion: 'Indikasi resiko lingkungan cukup tinggi berdasarkan visual kamera yang didapat. Terdeteksi beberapa objek mencurigakan di permukaan air dengan skor bahaya visual 65/100. Diperlukan verifikasi lapangan sebelum tim memasuki area sungai.',
      apdRecommendations: [
        'Helm keselamatan standar dengan chin-strap',
        'Pakaian lengan panjang tahan air (water-resistant)',
        'Sarung tangan karet tebal tahan kimia ringan',
        'Rompi pelampung tipe II (standar operasional)',
        'Sepatu boots karet anti-slip waterproof',
        'Kacamata pelindung (safety goggles)',
        'Masker N95 sebagai pencegahan kontaminasi',
      ],
      operationGuidelines: [
        'Lakukan verifikasi kondisi lapangan sebelum tim memasuki area',
        'Operasikan AUV dalam mode lambat (reduced speed, mode waspada)',
        'Batasi jumlah personel di area sungai (maks. 3 orang)',
        'Pastikan 1 personel selalu dalam posisi standby di darat',
        'Ambil sampel air tambahan untuk uji laboratorium',
        'Perbarui status kondisi setiap 15 menit ke koordinator',
        'Siapkan rencana evakuasi cepat jika kondisi memburuk',
      ],
    },
  },

  danger: {
    key: 'danger',
    label: 'Danger Scenario',
    sensorData: {
      ph: 5.8,
      temperature: 30.1,
      tds: 920,
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
        { parameter: 'pH', status: 'CUKUP TINGGI', value: '5.8', contribution: 6 },
        { parameter: 'TDS', status: 'TINGGI', value: '920 ppm', contribution: 9 },
        { parameter: 'Suhu', status: 'SEDANG', value: '30.1°C', contribution: 2 },
        { parameter: 'Visual Hazard', status: 'TINGGI', value: 'HIGH', contribution: 18 },
      ],
      reasoning: 'PERINGATAN: Kondisi sungai berisiko tinggi. Konsentrasi zat terlarut sangat tinggi, pH rendah, dan terdapat objek berbahaya pada permukaan air. Personel diinstruksikan tidak memasuki area sungai tanpa evaluasi lebih lanjut.',
      recommendations: [
        'DILARANG memasuki sungai tanpa evaluasi tambahan',
        'Aktifkan protokol keselamatan tingkat tinggi',
        'Gunakan APD lengkap termasuk pelampung',
        'Siapkan tim SAR standby',
        'Gunakan peralatan mekanis untuk pembersihan',
        'Laporkan kondisi ke koordinator lapangan',
      ],
      sensorConclusion: 'Indikasi resiko lingkungan tinggi berdasarkan parameter sensor yang diukur: pH 5.8 di luar rentang aman, TDS 920 ppm melebihi batas operasional. Kualitas air saat ini tidak memenuhi standar keselamatan operasi. Evaluasi menyeluruh diperlukan sebelum personel memasuki area.',
      visualConclusion: 'Indikasi resiko lingkungan tinggi berdasarkan visual kamera yang didapat. AI Vision mendeteksi objek berbahaya dengan skor hazard 90/100. Banyak objek berbahaya terdeteksi, termasuk limbah kimia dan manusia di area sungai. Personel diinstruksikan untuk tidak mendekati area tanpa prosedur keselamatan lengkap.',
      apdRecommendations: [
        'Helm keselamatan full-face shield (kelas A)',
        'Pakaian hazmat tahan kimia (kategori B)',
        'Sepatu safety boots waterproof kelas II',
        'Sarung tangan nitril tebal + pelindung lengan',
        'Rompi pelampung tipe I (self-inflating, beban berat)',
        'Respirator/masker full-face filter kimia',
        'Tali pengaman + harness body untuk operasi dekat air',
        'Komunikasi radio waterproof (wajib aktif)',
      ],
      operationGuidelines: [
        'HENTIKAN semua operasi lapangan sampai kondisi dievaluasi ulang',
        'Aktifkan Protokol Darurat Level 3 dan lapor ke koordinator segera',
        'Gunakan hanya peralatan mekanis/robotik untuk pengambilan data',
        'Pasang tanda peringatan (safety barrier) di area radius 50m',
        'Siapkan tim SAR dalam posisi standby di lokasi terdekat',
        'Lakukan evakuasi warga dari bantaran sungai jika diperlukan',
        'Rekam semua kondisi dengan kamera untuk dokumentasi insiden',
        'Hubungi BPBD dan instansi terkait jika ancaman menyebar',
      ],
    },
  },
};

export const defaultScenario = 'caution';
