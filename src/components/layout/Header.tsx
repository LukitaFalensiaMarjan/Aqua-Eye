// ============================================================
// AQUA EYE — Global Header
// ============================================================

import { Bell, Wifi, Clock, Menu, RefreshCw } from 'lucide-react';
import { useAlerts } from '../../context/AlertContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const { activeAlertCount } = useAlerts();
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (d: Date) =>
    d.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <header
      className="h-14 flex items-center justify-between px-4 md:px-6"
      style={{
        background: 'var(--color-surface-1)',
        borderBottom: '3px solid #000',
      }}
    >
      {/* Left - Location */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button 
          onClick={onMenuClick}
          className="md:hidden p-1.5 -ml-2 text-gray-400 hover:text-white transition-colors"
        >
          <Menu size={24} />
        </button>
        
        <div className="hidden md:block">
          <div className="text-xs text-gray-400 font-mono tracking-wider">
            POS PEMANTAUAN
          </div>
          <div className="text-sm font-bold text-white font-heading">
            SUNGAI CIKAPUNDUNG
          </div>
        </div>
        <div className="md:hidden">
          <span className="text-sm font-bold text-white font-heading">AQUA EYE</span>
        </div>
      </div>

      {/* Right - Status */}
      <div className="flex items-center gap-4">
        {/* System Status */}
        <div
          className="hidden sm:flex items-center gap-2 px-3 py-1"
          style={{
            border: '2px solid var(--color-safe)',
            background: 'rgba(132, 204, 22, 0.1)',
          }}
        >
          <Wifi size={14} className="text-safe" />
          <span className="text-xs font-bold font-mono text-safe tracking-wider">
            SISTEM ONLINE
          </span>
        </div>

        {/* Date/Time */}
        <div className="hidden lg:flex flex-col items-end">
          <span className="text-[10px] text-gray-400 font-mono">{formatDate(currentTime)}</span>
          <span className="text-xs font-bold font-mono text-cyan-400">
            <Clock size={10} className="inline mr-1" />
            {formatTime(currentTime)}
          </span>
        </div>

        {/* Notifications */}
        <button
          className="relative p-2 text-gray-400 hover:text-white transition-colors"
          style={{
            border: '2px solid #000',
            background: 'var(--color-surface-2)',
          }}
        >
          <Bell size={18} />
          {activeAlertCount > 0 && (
            <span
              className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold text-white"
              style={{
                background: 'var(--color-danger)',
                border: '2px solid #000',
              }}
            >
              {activeAlertCount}
            </span>
          )}
        </button>

        {/* Role Switcher */}
        <button
          onClick={() => {
            login('warga', 'demo123');
            navigate('/warga/beranda');
          }}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold font-mono text-cyan-400 hover:text-white transition-colors"
          style={{ border: '2px solid #000', background: 'var(--color-surface-2)' }}
        >
          <RefreshCw size={12} />
          SWITCH TO WARGA
        </button>

        {/* Profile */}
        <div
          className="w-8 h-8 flex items-center justify-center text-xs font-bold text-black"
          style={{
            background: 'var(--color-aqua-cyan)',
            border: '2px solid #000',
            boxShadow: '2px 2px 0px #000',
          }}
        >
          {user?.role === 'operator' ? 'OP' : 'WR'}
        </div>
      </div>
    </header>
  );
}
