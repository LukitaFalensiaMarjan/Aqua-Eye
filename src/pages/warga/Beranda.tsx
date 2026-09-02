// ============================================================
// AQUA EYE — Warga Beranda
// ============================================================

import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Map, Navigation, ShieldAlert, Waves } from 'lucide-react';
import { useScenario } from '../../context/ScenarioContext';

export default function WargaBeranda() {
  const navigate = useNavigate();
  const { scenario } = useScenario();

  return (
    <div className="p-4 max-w-lg mx-auto space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-[var(--color-surface-2)] border-4 border-black p-4 shadow-[6px_6px_0_0_#000] relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10">
          <Waves size={120} />
        </div>
        <h1 className="font-heading font-black text-2xl text-white mb-2 relative z-10">
          Halo, Warga!
        </h1>
        <p className="text-sm text-gray-300 relative z-10">
          Pantau kondisi sungai di sekitar Anda dan laporkan potensi bahaya dengan cepat.
        </p>
      </div>

      {/* Primary Action Button */}
      <button
        onClick={() => navigate('/warga/lapor')}
        className="w-full bg-cyan-400 hover:bg-cyan-500 border-4 border-black p-4 shadow-[6px_6px_0_0_#000] flex flex-col items-center justify-center gap-2 transition-transform hover:-translate-y-1 active:translate-y-1 active:shadow-[2px_2px_0_0_#000]"
      >
        <div className="bg-white p-2 border-2 border-black rounded-full">
          <AlertTriangle size={24} className="text-black" />
        </div>
        <div className="text-center">
          <div className="font-heading font-black text-lg text-black uppercase tracking-widest">
            LAPORKAN KONDISI SUNGAI
          </div>
          <div className="text-[10px] font-bold text-gray-800">
            Sampah, Banjir, atau Pencemaran
          </div>
        </div>
      </button>

      {/* Emergency Action Button */}
      <button
        onClick={() => navigate('/warga/lapor?emergency=true')}
        className="w-full bg-[var(--color-danger)] hover:bg-red-600 border-4 border-black p-4 shadow-[6px_6px_0_0_#000] flex flex-col items-center justify-center gap-2 transition-transform hover:-translate-y-1 active:translate-y-1 active:shadow-[2px_2px_0_0_#000] mt-4"
      >
        <div className="bg-white p-2 border-2 border-black rounded-full">
          <ShieldAlert size={24} className="text-red-600" />
        </div>
        <div className="text-center">
          <div className="font-heading font-black text-lg text-white uppercase tracking-widest">
            LAPORKAN DARURAT
          </div>
          <div className="text-[10px] font-bold text-red-100">
            Orang tenggelam atau bahaya ekstrem
          </div>
        </div>
      </button>

      {/* Quick Status */}
      <div className="space-y-3">
        <div className="flex justify-between items-end">
          <h2 className="font-heading font-black text-lg text-white">Status Sungai Terkini</h2>
          <button 
            onClick={() => navigate('/warga/kondisi')}
            className="text-xs font-bold text-cyan-400 flex items-center gap-1 hover:underline"
          >
            Lihat Peta <Navigation size={12} />
          </button>
        </div>

        <div className={`border-4 border-black p-4 shadow-[4px_4px_0_0_#000] flex items-center gap-4 ${
          scenario.assessment.risk === 'danger' ? 'bg-[var(--color-danger)]' :
          scenario.assessment.risk === 'caution' ? 'bg-[var(--color-caution)]' :
          'bg-[var(--color-safe)]'
        }`}>
          <div className="bg-white p-2 border-2 border-black">
            <ShieldAlert size={24} className="text-black" />
          </div>
          <div>
            <div className="font-mono text-[10px] font-bold text-black opacity-70">
              AQUA SAFE INDEX: {scenario.assessment.score}
            </div>
            <div className="font-heading font-black text-xl text-black uppercase tracking-wider">
              {scenario.assessment.risk}
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 italic">
          "Kondisi saat ini: {scenario.assessment.risk === 'safe' ? 'Aman' : scenario.assessment.risk === 'caution' ? 'Perlu perhatian, hindari kontak air' : 'Berbahaya, jauhi area sungai'}."
        </p>
      </div>

      {/* Secondary Menu */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => navigate('/warga/laporan-saya')}
          className="bg-[var(--color-surface-1)] border-2 border-black p-4 shadow-[4px_4px_0_0_#000] flex flex-col items-center justify-center gap-2 text-center hover:-translate-y-1 transition-transform"
        >
          <div className="text-cyan-400">
            <AlertTriangle size={24} />
          </div>
          <div className="font-bold text-sm text-white">Laporan Saya</div>
        </button>

        <button
          onClick={() => navigate('/warga/info')}
          className="bg-[var(--color-surface-1)] border-2 border-black p-4 shadow-[4px_4px_0_0_#000] flex flex-col items-center justify-center gap-2 text-center hover:-translate-y-1 transition-transform"
        >
          <div className="text-yellow-400">
            <Map size={24} />
          </div>
          <div className="font-bold text-sm text-white">Info Keselamatan</div>
        </button>
      </div>
    </div>
  );
}
