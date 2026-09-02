// ============================================================
// AQUA EYE — Warga Laporan Saya
// ============================================================

import { useReports } from '../../context/ReportContext';
import { Clock, CheckCircle, RefreshCcw, ArrowRight, ShieldAlert } from 'lucide-react';
import type { ReportStatus } from '../../types';

const statusConfig: Record<ReportStatus, { label: string; icon: any; color: string }> = {
  new: { label: 'Terkirim', icon: ArrowRight, color: 'text-gray-400' },
  verification: { label: 'Menunggu Verifikasi', icon: Clock, color: 'text-yellow-400' },
  in_progress: { label: 'Sedang Ditangani', icon: RefreshCcw, color: 'text-cyan-400' },
  resolved: { label: 'Selesai', icon: CheckCircle, color: 'text-green-400' },
};

export default function WargaLaporanSaya() {
  const { reports } = useReports();
  // Filter for demo purpose: just show all since it's a prototype, or mock a specific user filter
  const myReports = reports; 

  if (myReports.length === 0) {
    return (
      <div className="p-4 flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="bg-[var(--color-surface-2)] p-6 border-4 border-black shadow-[6px_6px_0_0_#000]">
          <ShieldAlert size={48} className="text-gray-500 mx-auto mb-4" />
          <h2 className="font-heading font-black text-xl text-white mb-2">Belum Ada Laporan</h2>
          <p className="text-sm text-gray-400">Anda belum mengirimkan laporan kondisi sungai apa pun.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-lg mx-auto pb-24 space-y-4">
      <div className="mb-6 border-l-4 border-cyan-400 pl-3">
        <h1 className="font-heading font-black text-2xl text-white">Laporan Saya</h1>
        <p className="text-xs text-gray-400">Lacak status laporan yang Anda kirimkan.</p>
      </div>

      {myReports.map((report) => {
        const currentStatus = statusConfig[report.status];
        const Icon = currentStatus.icon;

        return (
          <div 
            key={report.id} 
            className="bg-[var(--color-surface-2)] border-2 border-black p-4 shadow-[4px_4px_0_0_#000]"
          >
            <div className="flex justify-between items-start mb-4 border-b-2 border-black pb-3">
              <div>
                <div className="text-[10px] font-mono text-cyan-400 mb-1">{report.id}</div>
                <h3 className="font-bold text-white text-sm">{report.category}</h3>
                <div className="text-[10px] text-gray-400">{new Date(report.timestamp).toLocaleString('id-ID')}</div>
              </div>
              <div className={`px-2 py-1 border-2 border-black text-[9px] font-bold shadow-[2px_2px_0_0_#000] flex items-center gap-1 bg-[var(--color-surface-1)] ${currentStatus.color}`}>
                <Icon size={12} />
                {currentStatus.label.toUpperCase()}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="text-xs text-gray-300">
                <span className="text-gray-500 block text-[10px] uppercase font-bold mb-0.5">Lokasi</span>
                {report.location}
              </div>
              <div className="text-xs text-gray-300">
                <span className="text-gray-500 block text-[10px] uppercase font-bold mb-0.5">Deskripsi</span>
                {report.description}
              </div>
              {report.photoUrl && (
                <div className="mt-2 text-[10px] text-gray-400 flex items-center gap-1">
                  <span className="inline-block w-2 h-2 bg-cyan-400 mr-1" />
                  Termasuk 1 foto bukti
                </div>
              )}
            </div>

            {/* Simple Progress Timeline */}
            <div className="bg-[var(--color-surface-1)] p-3 border-2 border-black">
              <div className="text-[10px] font-bold text-gray-500 mb-2 uppercase">Timeline Proses</div>
              <div className="space-y-2 relative before:absolute before:inset-0 before:ml-[7px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-600 before:to-transparent">
                
                {['new', 'verification', 'in_progress', 'resolved'].map((stepStatus) => {
                  // Basic logic to determine if step is reached based on arbitrary order
                  const order = ['new', 'verification', 'in_progress', 'resolved'];
                  const currentIndex = order.indexOf(report.status);
                  const stepIndex = order.indexOf(stepStatus);
                  const isReached = stepIndex <= currentIndex;
                  const StepIcon = statusConfig[stepStatus as ReportStatus].icon;
                  const stepColor = isReached ? statusConfig[stepStatus as ReportStatus].color : 'text-gray-600';

                  return (
                    <div key={stepStatus} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className={`flex items-center justify-center w-4 h-4 rounded-full border-2 border-black bg-[var(--color-surface-1)] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ${isReached ? 'border-cyan-400' : 'border-gray-600'}`}>
                        <StepIcon size={8} className={stepColor} />
                      </div>
                      <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] px-3 text-[10px]">
                        <span className={`font-bold ${stepColor}`}>{statusConfig[stepStatus as ReportStatus].label}</span>
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}
