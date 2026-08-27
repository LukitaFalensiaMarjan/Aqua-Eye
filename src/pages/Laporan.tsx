// ============================================================
// AQUA EYE — Laporan (Reports) Page
// ============================================================

import { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { useToast } from '../components/ui/Toast';
import { FileText, Download, Calendar, MapPin, Cpu, FileSpreadsheet, File } from 'lucide-react';

const reportTypes = [
  { id: 'kualitas_air', label: 'Laporan Kualitas Air', description: 'Ringkasan data kualitas air periode tertentu' },
  { id: 'deteksi_bahaya', label: 'Laporan Deteksi Bahaya', description: 'Daftar dan analisis deteksi bahaya oleh AI' },
  { id: 'operasi', label: 'Laporan Operasi', description: 'Laporan kegiatan operasi pembersihan sungai' },
  { id: 'perangkat', label: 'Laporan Perangkat', description: 'Status dan performa perangkat monitoring' },
  { id: 'ringkasan', label: 'Ringkasan Monitoring', description: 'Ringkasan eksekutif pemantauan sungai' },
];

const locations = [
  'Semua Lokasi',
  'Cikapundung Tengah',
  'Jembatan Pasupati',
  'Cikapundung Hilir',
  'Cikapundung Hulu',
];

const devices = ['Semua Perangkat', 'AUV-01', 'AUV-02', 'AUV-03', 'AUV-04'];

export default function Laporan() {
  const { addToast } = useToast();
  const [selectedType, setSelectedType] = useState('kualitas_air');
  const [dateRange, setDateRange] = useState({ start: '2026-08-20', end: '2026-08-26' });
  const [location, setLocation] = useState('Semua Lokasi');
  const [device, setDevice] = useState('Semua Perangkat');
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      addToast('success', 'Laporan berhasil dibuat — Prototype simulasi');
    }, 2000);
  };

  return (
    <PageContainer
      title="Laporan"
      subtitle="Generate dan export laporan pemantauan"
    >
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Left - Config */}
        <div className="xl:col-span-5 space-y-4">
          {/* Report Type */}
          <div
            className="brutal-card p-4"
            style={{ background: 'var(--color-surface-2)', border: '3px solid #000', boxShadow: '5px 5px 0px #000' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <FileText size={16} className="text-cyan-400" />
              <span className="text-xs font-bold font-heading text-cyan-400 uppercase tracking-wider">
                Jenis Laporan
              </span>
            </div>
            <div className="space-y-2">
              {reportTypes.map(rt => (
                <button
                  key={rt.id}
                  onClick={() => setSelectedType(rt.id)}
                  className="w-full text-left p-3 transition-all"
                  style={selectedType === rt.id ? {
                    background: 'var(--color-aqua-blue)',
                    border: '2px solid #000',
                    boxShadow: '3px 3px 0px #000',
                  } : {
                    background: 'var(--color-surface-3)',
                    border: '2px solid #1E3048',
                  }}
                >
                  <div className={`text-xs font-bold ${selectedType === rt.id ? 'text-white' : 'text-gray-300'}`}>
                    {rt.label}
                  </div>
                  <div className={`text-[10px] mt-0.5 ${selectedType === rt.id ? 'text-white/70' : 'text-gray-500'}`}>
                    {rt.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Settings & Actions */}
        <div className="xl:col-span-7 space-y-4">
          {/* Date Range */}
          <div
            className="brutal-card p-4"
            style={{ background: 'var(--color-surface-2)', border: '3px solid #000', boxShadow: '5px 5px 0px #000' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={16} className="text-cyan-400" />
              <span className="text-xs font-bold font-heading text-cyan-400 uppercase tracking-wider">
                Periode
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="brutal-input flex-1 px-3 py-2 text-sm"
              />
              <span className="text-gray-500 font-bold">—</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="brutal-input flex-1 px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Location & Device */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className="brutal-card p-4"
              style={{ background: 'var(--color-surface-2)', border: '3px solid #000', boxShadow: '5px 5px 0px #000' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={14} className="text-cyan-400" />
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Lokasi</span>
              </div>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="brutal-input w-full px-3 py-2 text-xs"
              >
                {locations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div
              className="brutal-card p-4"
              style={{ background: 'var(--color-surface-2)', border: '3px solid #000', boxShadow: '5px 5px 0px #000' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Cpu size={14} className="text-cyan-400" />
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Perangkat</span>
              </div>
              <select
                value={device}
                onChange={(e) => setDevice(e.target.value)}
                className="brutal-input w-full px-3 py-2 text-xs"
              >
                {devices.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          {/* Summary */}
          <div
            className="brutal-card p-4"
            style={{ background: 'var(--color-surface-3)', border: '3px solid #1E3048' }}
          >
            <div className="text-xs font-mono text-gray-400 space-y-1">
              <div>Tipe: <span className="text-white font-bold">{reportTypes.find(r => r.id === selectedType)?.label}</span></div>
              <div>Periode: <span className="text-white">{dateRange.start} — {dateRange.end}</span></div>
              <div>Lokasi: <span className="text-white">{location}</span></div>
              <div>Perangkat: <span className="text-white">{device}</span></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="brutal-btn brutal-btn-primary py-3 text-sm flex items-center justify-center gap-2"
            >
              <FileText size={16} />
              {generating ? 'Generating...' : 'Generate Report'}
            </button>
            <button
              onClick={() => addToast('info', 'Export PDF — Simulasi prototype')}
              className="brutal-btn py-3 text-sm flex items-center justify-center gap-2"
              style={{ background: 'var(--color-danger)', color: '#fff', border: '3px solid #000', boxShadow: '4px 4px 0px #000' }}
            >
              <File size={16} /> Export PDF
            </button>
            <button
              onClick={() => addToast('info', 'Export Excel — Simulasi prototype')}
              className="brutal-btn py-3 text-sm flex items-center justify-center gap-2"
              style={{ background: 'var(--color-safe)', color: '#000', border: '3px solid #000', boxShadow: '4px 4px 0px #000' }}
            >
              <FileSpreadsheet size={16} /> Export Excel
            </button>
          </div>

          {/* Generated Report Preview */}
          {generating && (
            <div
              className="brutal-card p-6 text-center animate-pulse"
              style={{ background: 'var(--color-surface-2)', border: '3px solid var(--color-aqua-blue)', boxShadow: '5px 5px 0px var(--color-aqua-blue)' }}
            >
              <Download size={32} className="text-blue-400 mx-auto mb-3 animate-bounce" />
              <div className="text-sm font-bold text-white">Generating laporan...</div>
              <div className="text-xs text-gray-400 mt-1">Simulasi prototype — data demo</div>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
