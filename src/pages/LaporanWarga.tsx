// ============================================================
// AQUA EYE — Operator Laporan Warga
// ============================================================

import { useState } from 'react';
import { useReports } from '../context/ReportContext';
import { useScenario } from '../context/ScenarioContext';
import { useToast } from '../components/ui/Toast';
import PageContainer from '../components/layout/PageContainer';
import Modal from '../components/ui/Modal';
import { MapPin, CheckCircle, Clock, ShieldAlert, Image as ImageIcon, Cpu } from 'lucide-react';
import type { CitizenReport, ReportStatus } from '../types';

const statusConfig: Record<ReportStatus, { label: string; color: string; bg: string }> = {
  new: { label: 'BARU', color: 'text-cyan-400', bg: 'bg-cyan-400/20' },
  verification: { label: 'VERIFIKASI', color: 'text-yellow-400', bg: 'bg-yellow-400/20' },
  in_progress: { label: 'DIPROSES', color: 'text-orange-400', bg: 'bg-orange-400/20' },
  resolved: { label: 'SELESAI', color: 'text-green-400', bg: 'bg-green-400/20' },
};

export default function LaporanWarga() {
  const { reports, updateReportStatus } = useReports();
  const { scenario } = useScenario();
  const { addToast } = useToast();
  
  const [filter, setFilter] = useState<ReportStatus | 'all'>('all');
  const [selectedReport, setSelectedReport] = useState<CitizenReport | null>(null);

  const filteredReports = filter === 'all' ? reports : reports.filter(r => r.status === filter);

  const handleAction = (status: ReportStatus, message: string) => {
    if (selectedReport) {
      updateReportStatus(selectedReport.id, status);
      addToast('success', message);
      setSelectedReport(null);
    }
  };

  return (
    <PageContainer
      title="Laporan Warga"
      subtitle="Pantau dan verifikasi laporan masyarakat terkait kondisi sungai"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-[var(--color-surface-2)] border-2 border-black p-3 shadow-[4px_4px_0_0_#000] text-center">
          <div className="text-2xl font-black text-white">{reports.length}</div>
          <div className="text-[10px] font-bold text-gray-400 uppercase">Total</div>
        </div>
        <div className="bg-[var(--color-surface-2)] border-2 border-black p-3 shadow-[4px_4px_0_0_#000] text-center cursor-pointer hover:-translate-y-1 transition-transform" onClick={() => setFilter('new')}>
          <div className="text-2xl font-black text-cyan-400">{reports.filter(r => r.status === 'new').length}</div>
          <div className="text-[10px] font-bold text-gray-400 uppercase">Baru</div>
        </div>
        <div className="bg-[var(--color-surface-2)] border-2 border-black p-3 shadow-[4px_4px_0_0_#000] text-center cursor-pointer hover:-translate-y-1 transition-transform" onClick={() => setFilter('verification')}>
          <div className="text-2xl font-black text-yellow-400">{reports.filter(r => r.status === 'verification').length}</div>
          <div className="text-[10px] font-bold text-gray-400 uppercase">Verifikasi</div>
        </div>
        <div className="bg-[var(--color-surface-2)] border-2 border-black p-3 shadow-[4px_4px_0_0_#000] text-center cursor-pointer hover:-translate-y-1 transition-transform" onClick={() => setFilter('in_progress')}>
          <div className="text-2xl font-black text-orange-400">{reports.filter(r => r.status === 'in_progress').length}</div>
          <div className="text-[10px] font-bold text-gray-400 uppercase">Diproses</div>
        </div>
        <div className="bg-[var(--color-surface-2)] border-2 border-black p-3 shadow-[4px_4px_0_0_#000] text-center cursor-pointer hover:-translate-y-1 transition-transform" onClick={() => setFilter('resolved')}>
          <div className="text-2xl font-black text-green-400">{reports.filter(r => r.status === 'resolved').length}</div>
          <div className="text-[10px] font-bold text-gray-400 uppercase">Selesai</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'new', 'verification', 'in_progress', 'resolved'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-2 text-xs font-bold border-2 border-black transition-all ${
              filter === f 
              ? 'bg-white text-black shadow-[3px_3px_0_0_#000]' 
              : 'bg-[var(--color-surface-1)] text-gray-400 hover:text-white'
            }`}
          >
            {f === 'all' ? 'SEMUA' : statusConfig[f as ReportStatus].label}
          </button>
        ))}
      </div>

      {/* Report List */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <div className="text-center p-10 border-2 border-dashed border-gray-600 text-gray-500">
            Tidak ada laporan dalam kategori ini.
          </div>
        ) : (
          filteredReports.map(report => (
            <div 
              key={report.id}
              onClick={() => setSelectedReport(report)}
              className="bg-[var(--color-surface-1)] border-l-4 border-y-2 border-r-2 border-black p-4 shadow-[4px_4px_0_0_#000] flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:-translate-x-1 transition-transform group"
              style={{ borderLeftColor: report.priority === 'critical' ? 'var(--color-danger)' : report.priority === 'high' ? 'var(--color-caution)' : 'var(--color-safe)' }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono bg-[var(--color-surface-2)] border border-gray-600 px-1 text-gray-400">{report.id}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 border border-black ${statusConfig[report.status].bg} ${statusConfig[report.status].color}`}>
                    {statusConfig[report.status].label}
                  </span>
                  {report.linkedAlertId && (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-red-500/20 text-red-400 border border-red-500 flex items-center gap-1">
                      <ShieldAlert size={10} /> TERHUBUNG ALERT
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-white text-lg group-hover:text-cyan-400 transition-colors">{report.category}</h3>
                <div className="text-xs text-gray-400 flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {report.location}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {new Date(report.timestamp).toLocaleString('id-ID')}</span>
                </div>
              </div>
              
              <div className="md:w-1/4 text-sm text-gray-300 line-clamp-2 italic border-l-2 border-gray-800 pl-4">
                "{report.description}"
              </div>

              <div className="text-right">
                <button className="brutal-btn brutal-btn-primary px-4 py-2 text-xs">
                  LIHAT DETAIL
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedReport && (
        <Modal
          isOpen={!!selectedReport}
          onClose={() => setSelectedReport(null)}
          title={`Detail Laporan Warga: ${selectedReport.id}`}
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Citizen Data */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2">Informasi Laporan</h4>
                  <div className="bg-[var(--color-surface-1)] border-2 border-black p-3 space-y-2">
                    <div>
                      <div className="text-[10px] text-gray-500">Pelapor</div>
                      <div className="text-sm font-bold text-white">{selectedReport.citizen}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500">Kategori</div>
                      <div className="text-sm font-bold text-white">{selectedReport.category}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500">Lokasi</div>
                      <div className="text-sm font-bold text-white">{selectedReport.location}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500">Waktu</div>
                      <div className="text-sm text-white">{new Date(selectedReport.timestamp).toLocaleString('id-ID')}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2">Deskripsi Kejadian</h4>
                  <div className="bg-[var(--color-surface-1)] border-2 border-black p-3 text-sm text-gray-300 italic">
                    "{selectedReport.description}"
                  </div>
                </div>

                {/* Simulated Photo Evidence */}
                <div>
                  <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2">Bukti Foto</h4>
                  {selectedReport.photoUrl ? (
                    <img src={selectedReport.photoUrl} alt="Bukti" className="w-full h-40 object-cover border-2 border-black" />
                  ) : (
                    <div className="w-full h-32 bg-[var(--color-surface-1)] border-2 border-dashed border-gray-600 flex flex-col items-center justify-center text-gray-500">
                      <ImageIcon size={24} className="mb-2" />
                      <span className="text-xs">Tidak ada foto terlampir</span>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Cross-Check */}
              <div>
                <h4 className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Cpu size={14} /> AI Cross-Check (Kondisi Saat Ini)
                </h4>
                <div className="bg-[var(--color-surface-1)] border-4 border-cyan-400 p-4 shadow-[4px_4px_0_0_#00D4FF]">
                  
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b-2 border-gray-800">
                    <div className={`w-16 h-16 rounded-full border-2 border-black flex items-center justify-center ${
                      scenario.assessment.risk === 'danger' ? 'bg-[var(--color-danger)]' :
                      scenario.assessment.risk === 'caution' ? 'bg-[var(--color-caution)]' : 'bg-[var(--color-safe)]'
                    }`}>
                      <div className="text-center">
                        <div className="text-[8px] font-bold text-black uppercase">Index</div>
                        <div className="text-xl font-black text-black leading-none">{scenario.assessment.score}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-gray-400">STATUS AREA</div>
                      <div className="font-heading font-black text-lg text-white uppercase">{scenario.assessment.risk}</div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Turbidity</span>
                      <span className="text-xs font-bold text-white">{scenario.sensorData.turbidity} NTU</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">pH Level</span>
                      <span className="text-xs font-bold text-white">{scenario.sensorData.ph}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Water Depth</span>
                      <span className="text-xs font-bold text-white">{scenario.sensorData.depth} m</span>
                    </div>
                  </div>

                  <div className="bg-[var(--color-surface-0)] border-l-2 border-cyan-400 p-3 text-xs text-cyan-100">
                    <strong>Kesimpulan AI:</strong> Data lapangan saat ini {scenario.assessment.risk !== 'safe' ? 'mendukung' : 'belum sepenuhnya mengkonfirmasi'} laporan warga. Disarankan untuk memverifikasi melalui kamera CCTV terdekat.
                  </div>
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t-2 border-gray-800">
              {selectedReport.status === 'new' && (
                <button 
                  onClick={() => handleAction('verification', 'Laporan masuk ke tahap verifikasi')}
                  className="brutal-btn bg-yellow-400 text-black hover:bg-yellow-500 py-3 text-sm flex-1 font-bold"
                >
                  VERIFIKASI LAPORAN
                </button>
              )}
              {selectedReport.status === 'verification' && (
                <button 
                  onClick={() => handleAction('in_progress', 'Laporan diteruskan ke tim penanganan')}
                  className="brutal-btn bg-orange-400 text-black hover:bg-orange-500 py-3 text-sm flex-1 font-bold"
                >
                  TERUSKAN KE TIM (DIPROSES)
                </button>
              )}
              {(selectedReport.status === 'in_progress' || selectedReport.status === 'verification') && (
                <button 
                  onClick={() => handleAction('resolved', 'Laporan ditandai selesai')}
                  className="brutal-btn bg-green-400 text-black hover:bg-green-500 py-3 text-sm flex-1 font-bold flex justify-center items-center gap-2"
                >
                  <CheckCircle size={16} /> TANDAI SELESAI
                </button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </PageContainer>
  );
}
