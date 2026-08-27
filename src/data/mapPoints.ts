// ============================================================
// AQUA EYE — GIS Map Points (Sungai Cikapundung, Bandung)
// ============================================================

import type { MonitoringPoint } from '../types';

export const mapCenter = { lat: -6.9050, lng: 107.6120 };
export const mapZoom = 14;

export const monitoringPoints: MonitoringPoint[] = [
  {
    id: 'MP-01',
    name: 'AUV-01 — Pos Cikapundung Tengah',
    coordinates: { lat: -6.9148, lng: 107.6098 },
    type: 'device',
    status: 'caution',
    deviceId: 'AUV-01',
    description: 'Pos pemantauan utama di segmen tengah Sungai Cikapundung. Turbidity tinggi terdeteksi.',
    lastUpdate: '2026-08-26T15:10:00+07:00',
  },
  {
    id: 'MP-02',
    name: 'AUV-02 — Jembatan Pasupati',
    coordinates: { lat: -6.9020, lng: 107.6155 },
    type: 'device',
    status: 'safe',
    deviceId: 'AUV-02',
    description: 'Pos pemantauan di area Jembatan Pasupati. Semua parameter dalam batas normal.',
    lastUpdate: '2026-08-26T15:08:00+07:00',
  },
  {
    id: 'MP-03',
    name: 'AUV-03 — Pos Cikapundung Hilir',
    coordinates: { lat: -6.9175, lng: 107.6091 },
    type: 'device',
    status: 'danger',
    deviceId: 'AUV-03',
    description: 'Pos pemantauan hilir. Objek berbahaya dan limbah kimia terdeteksi.',
    lastUpdate: '2026-08-26T15:05:00+07:00',
  },
  {
    id: 'MP-04',
    name: 'AUV-04 — Pos Cikapundung Hulu',
    coordinates: { lat: -6.8620, lng: 107.6170 },
    type: 'device',
    status: 'caution',
    deviceId: 'AUV-04',
    description: 'Pos pemantauan hulu. Baterai rendah, kamera offline.',
    lastUpdate: '2026-08-26T14:00:00+07:00',
  },
  {
    id: 'MP-05',
    name: 'Tumpukan Sampah — Segmen Tengah',
    coordinates: { lat: -6.9100, lng: 107.6115 },
    type: 'hazard',
    status: 'danger',
    description: 'Tumpukan sampah besar terdeteksi oleh AI Vision. Volume estimasi 2m³.',
    lastUpdate: '2026-08-26T08:45:00+07:00',
  },
  {
    id: 'MP-06',
    name: 'Insiden Darurat — Deteksi Manusia',
    coordinates: { lat: -6.9030, lng: 107.6148 },
    type: 'emergency',
    status: 'emergency',
    description: 'AI Emergency Assist mendeteksi manusia di area sungai berbahaya. Confidence: 94%.',
    lastUpdate: '2026-08-26T15:10:00+07:00',
  },
  {
    id: 'MP-07',
    name: 'Titik Pemantauan — Babakan Siliwangi',
    coordinates: { lat: -6.8850, lng: 107.6080 },
    type: 'river_point',
    status: 'safe',
    description: 'Titik pemantauan manual. Kondisi terakhir: aman.',
    lastUpdate: '2026-08-26T07:00:00+07:00',
  },
  {
    id: 'MP-08',
    name: 'Kontaminasi Kimia — Hilir',
    coordinates: { lat: -6.9200, lng: 107.6080 },
    type: 'hazard',
    status: 'caution',
    description: 'Area dengan riwayat kontaminasi kimia. Status: sudah ditangani.',
    lastUpdate: '2026-08-26T11:20:00+07:00',
  },
];
