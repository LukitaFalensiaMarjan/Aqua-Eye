// ============================================================
// AQUA EYE — Mock Citizen Reports Data
// ============================================================

import type { CitizenReport } from '../types';

export const mockCitizenReports: CitizenReport[] = [
  {
    id: 'WR-024',
    category: 'Sampah',
    description: 'Tumpukan sampah terlihat menyumbat di bawah jembatan, air sungai meluap sedikit.',
    location: 'Sungai Cikapundung (Jembatan Pasupati)',
    coordinates: { lat: -6.8988, lng: 107.6080 },
    status: 'new',
    priority: 'high',
    citizen: 'Warga / Anonim',
    timestamp: '2026-09-02T12:42:00+07:00',
  },
  {
    id: 'WR-023',
    category: 'Pencemaran',
    description: 'Air sungai tiba-tiba berwarna sangat gelap dan berbau menyengat.',
    location: 'Sungai Cikapundung Hilir',
    coordinates: { lat: -6.9248, lng: 107.6108 },
    status: 'verification',
    priority: 'medium',
    citizen: 'Budi Santoso',
    timestamp: '2026-09-02T09:15:00+07:00',
  },
  {
    id: 'WR-022',
    category: 'Objek Berbahaya',
    description: 'Ada ranting pohon besar tumbang menghalangi aliran sungai.',
    location: 'Pos Cikapundung Hulu',
    coordinates: { lat: -6.8748, lng: 107.6068 },
    status: 'in_progress',
    priority: 'high',
    citizen: 'Andi M.',
    timestamp: '2026-09-01T15:30:00+07:00',
    linkedAlertId: 'ALR-EM-01',
  },
  {
    id: 'WR-021',
    category: 'Lainnya',
    description: 'Banyak warga yang memancing dekat area yang rawan longsor.',
    location: 'Cikapundung Tengah',
    coordinates: { lat: -6.9148, lng: 107.6098 },
    status: 'resolved',
    priority: 'low',
    citizen: 'Siti K.',
    timestamp: '2026-08-31T10:00:00+07:00',
  },
  {
    id: 'WR-020',
    category: 'Banjir',
    description: 'Debit air meningkat drastis setelah hujan lebat, sudah hampir mencapai bibir jalan.',
    location: 'Sungai Cikapundung',
    coordinates: { lat: -6.9050, lng: 107.6090 },
    status: 'resolved',
    priority: 'critical',
    citizen: 'Warga Setempat',
    timestamp: '2026-08-25T17:45:00+07:00',
  }
];
