// ============================================================
// AQUA EYE — Sidebar Navigation
// ============================================================

import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Monitor,
  Map,
  Clock,
  Bell,
  Cpu,
  FileText,
  User,
  Droplets,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAlerts } from '../../context/AlertContext';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/live-monitoring', icon: Monitor, label: 'Live Monitoring' },
  { to: '/peta-gis', icon: Map, label: 'Peta GIS' },
  { to: '/riwayat', icon: Clock, label: 'Riwayat' },
  { to: '/alert-center', icon: Bell, label: 'Alert Center' },
  { to: '/perangkat', icon: Cpu, label: 'Perangkat' },
  { to: '/laporan', icon: FileText, label: 'Laporan' },
  { to: '/profil', icon: User, label: 'Profil' },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  desktopCollapsed?: boolean;
  setDesktopCollapsed?: (collapsed: boolean) => void;
}

export default function Sidebar({
  mobileOpen = false,
  onCloseMobile = () => {},
  desktopCollapsed: collapsed = false,
  setDesktopCollapsed = () => {}
}: SidebarProps) {
  const location = useLocation();
  const { activeAlertCount } = useAlerts();

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity" 
          onClick={onCloseMobile} 
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen z-50 flex flex-col transition-all duration-300 transform 
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0
          w-[240px] ${collapsed ? 'md:w-[72px]' : 'md:w-[220px]'}
        `}
        style={{
          background: 'var(--color-surface-1)',
          borderRight: '3px solid #000',
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-4 h-16"
          style={{ borderBottom: '3px solid #000' }}
        >
          <div
            className="w-10 h-10 flex items-center justify-center flex-shrink-0"
            style={{
              background: 'var(--color-aqua-blue)',
              border: '2px solid #000',
              boxShadow: '3px 3px 0px #000',
            }}
          >
            <Droplets size={22} className="text-white" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <div className="font-heading font-bold text-base text-white tracking-wide leading-tight">
                AQUA EYE
              </div>
              <div className="text-[10px] text-cyan-400 font-mono tracking-wider">
                AI SAFETY SYSTEM
              </div>
            </div>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-3 px-2 flex flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            const Icon = item.icon;
            const showBadge = item.to === '/alert-center' && activeAlertCount > 0;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onCloseMobile}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-semibold transition-all duration-100 relative ${
                  collapsed ? 'md:justify-center' : ''
                } ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white hover:translate-x-1'
                }`}
                style={
                  isActive
                    ? {
                        background: 'var(--color-aqua-blue)',
                        border: '3px solid #000',
                        boxShadow: '4px 4px 0px #000',
                      }
                    : {
                        border: '3px solid transparent',
                      }
                }
              >
                <Icon size={20} className="flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
                {showBadge && (
                  <span
                    className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold text-white rounded-full"
                    style={{ background: 'var(--color-danger)' }}
                  >
                    {activeAlertCount}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Collapse Button */}
        <button
          onClick={() => setDesktopCollapsed(!collapsed)}
          className="hidden md:flex items-center justify-center h-10 text-gray-500 hover:text-white transition-colors w-full"
          style={{ borderTop: '3px solid #000' }}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>

        {/* Prototype Indicator */}
        {!collapsed && (
          <div
            className="px-3 py-2 text-center"
            style={{ borderTop: '2px solid #1E3048' }}
          >
            <span
              className="text-[9px] font-mono tracking-widest px-2 py-1"
              style={{
                background: 'var(--color-caution)',
                color: '#000',
                border: '1px solid #000',
              }}
            >
              SIMULASI PROTOTYPE
            </span>
          </div>
        )}
      </aside>

    </>
  );
}
