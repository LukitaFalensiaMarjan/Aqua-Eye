// ============================================================
// AQUA EYE — Warga Layout
// ============================================================

import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Home, AlertTriangle, List, Activity, Info, User, RefreshCw } from 'lucide-react';
import logoAquaEye from '../../assets/logo_aqua_eye.png';

export default function WargaLayout() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/warga/beranda', label: 'Beranda', icon: <Home size={20} /> },
    { path: '/warga/lapor', label: 'Lapor', icon: <AlertTriangle size={20} /> },
    { path: '/warga/laporan-saya', label: 'Laporan Saya', icon: <List size={20} /> },
    { path: '/warga/kondisi', label: 'Kondisi', icon: <Activity size={20} /> },
    { path: '/warga/info', label: 'Info', icon: <Info size={20} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] pb-20 md:pb-0">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-[var(--color-surface-1)] border-b-4 border-black px-4 py-3 flex justify-between items-center shadow-[0_4px_0_0_#000]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[var(--color-surface-1)] border-2 border-black flex items-center justify-center font-bold text-white shadow-[2px_2px_0_0_#000] p-0.5">
            <img src={logoAquaEye} alt="AQUA EYE Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-heading font-black text-white text-sm">AQUA EYE</div>
            <div className="text-[9px] font-mono text-cyan-400">PUBLIC PORTAL</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              login('operator', 'demo123');
              navigate('/operator/dashboard');
            }}
            className="hidden md:flex items-center gap-2 px-3 py-1 text-[10px] font-bold font-mono text-cyan-400 hover:text-white transition-colors border-2 border-black bg-[var(--color-surface-2)]"
          >
            <RefreshCw size={12} />
            SWITCH TO OPERATOR
          </button>
          <span className="text-[10px] font-mono px-2 py-0.5 bg-yellow-400 text-black border-2 border-black shadow-[2px_2px_0_0_#000] font-bold">
            SIMULASI
          </span>
          <div className="w-8 h-8 bg-[var(--color-surface-2)] border-2 border-black flex items-center justify-center cursor-pointer">
            <User size={16} className="text-gray-300" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-surface-1)] border-t-4 border-black flex justify-between px-2 py-2 md:hidden">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 p-2 transition-all ${
                isActive ? 'text-white' : 'text-gray-500'
              }`}
            >
              <div className={`
                ${isActive ? 'bg-[var(--color-aqua-blue)] border-2 border-black p-1.5 shadow-[2px_2px_0_0_#000]' : 'p-1.5'}
              `}>
                {item.icon}
              </div>
              <span className={`text-[9px] font-bold ${isActive ? 'text-cyan-400' : ''}`}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Desktop Side Navigation */}
      <nav className="hidden md:flex flex-col w-[200px] fixed top-[60px] left-0 bottom-0 bg-[var(--color-surface-1)] border-r-4 border-black p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 p-3 text-left transition-all font-bold text-sm ${
                isActive
                  ? 'bg-[var(--color-aqua-blue)] border-2 border-black shadow-[4px_4px_0_0_#000] text-white'
                  : 'bg-[var(--color-surface-2)] border-2 border-black text-gray-400 hover:text-white hover:translate-x-1'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
