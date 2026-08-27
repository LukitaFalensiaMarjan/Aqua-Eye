// ============================================================
// AQUA EYE — Profil & Pengaturan Page
// ============================================================

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import { useToast } from '../components/ui/Toast';
import {
  User, Mail, Phone, MapPin, Shield, Clock,
  Bell, Sliders, Settings, LogOut, Save,
} from 'lucide-react';

export default function Profil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    alertDanger: true,
    alertCaution: true,
    alertSafe: false,
    deviceWarning: true,
  });

  const [thresholds, setThresholds] = useState({
    turbidityWarning: 50,
    turbidityDanger: 100,
    phMin: 6.0,
    phMax: 9.0,
    depthWarning: 1.5,
    depthDanger: 2.5,
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <PageContainer
      title="Profil & Pengaturan"
      subtitle="Kelola akun dan konfigurasi sistem"
      actions={
        <button
          onClick={handleLogout}
          className="brutal-btn brutal-btn-danger px-4 py-2 text-xs flex items-center gap-2"
        >
          <LogOut size={14} /> Keluar
        </button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Profile Card */}
        <div
          className="brutal-card p-5"
          style={{ background: 'var(--color-surface-2)', border: '3px solid #000', boxShadow: '5px 5px 0px #000' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <User size={16} className="text-cyan-400" />
            <span className="text-xs font-bold font-heading text-cyan-400 uppercase tracking-wider">
              Profil Pengguna
            </span>
          </div>

          <div className="flex items-center gap-4 mb-5">
            <div
              className="w-16 h-16 flex items-center justify-center text-xl font-black"
              style={{ background: 'var(--color-aqua-blue)', border: '3px solid #000', boxShadow: '4px 4px 0px #000', color: '#fff' }}
            >
              OP
            </div>
            <div>
              <div className="text-lg font-bold text-white font-heading">{user?.name}</div>
              <div className="text-xs text-gray-400">{user?.role}</div>
            </div>
          </div>

          <div className="space-y-3">
            <ProfileRow icon={<Mail size={14} />} label="Email" value={user?.email || ''} />
            <ProfileRow icon={<Phone size={14} />} label="Telepon" value={user?.phone || ''} />
            <ProfileRow icon={<MapPin size={14} />} label="Area" value={user?.area || ''} />
            <ProfileRow icon={<Shield size={14} />} label="Role" value={user?.role || ''} />
            <ProfileRow icon={<Clock size={14} />} label="Bergabung" value={user?.joinDate || ''} />
            <ProfileRow icon={<Clock size={14} />} label="Login Terakhir" value={user ? new Date(user.lastLogin).toLocaleString('id-ID') : ''} />
          </div>
        </div>

        {/* Notification Settings */}
        <div
          className="brutal-card p-5"
          style={{ background: 'var(--color-surface-2)', border: '3px solid #000', boxShadow: '5px 5px 0px #000' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Bell size={16} className="text-cyan-400" />
            <span className="text-xs font-bold font-heading text-cyan-400 uppercase tracking-wider">
              Pengaturan Notifikasi
            </span>
          </div>

          <div className="space-y-3">
            {[
              { key: 'email' as const, label: 'Notifikasi Email' },
              { key: 'push' as const, label: 'Push Notification' },
              { key: 'sms' as const, label: 'SMS Alert' },
              { key: 'alertDanger' as const, label: 'Alert Danger' },
              { key: 'alertCaution' as const, label: 'Alert Caution' },
              { key: 'alertSafe' as const, label: 'Alert Safe' },
              { key: 'deviceWarning' as const, label: 'Device Warning' },
            ].map(item => (
              <div
                key={item.key}
                className="flex items-center justify-between p-2"
                style={{ background: 'var(--color-surface-3)', border: '1px solid #1E3048' }}
              >
                <span className="text-xs text-gray-300">{item.label}</span>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                  className="w-10 h-5 relative cursor-pointer"
                  style={{
                    background: notifications[item.key] ? 'var(--color-safe)' : 'var(--color-surface-1)',
                    border: '2px solid #000',
                  }}
                >
                  <div
                    className="absolute top-0 w-4 h-full transition-all"
                    style={{
                      left: notifications[item.key] ? 'calc(100% - 16px)' : '0',
                      background: notifications[item.key] ? '#000' : '#666',
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Thresholds */}
        <div
          className="brutal-card p-5"
          style={{ background: 'var(--color-surface-2)', border: '3px solid #000', boxShadow: '5px 5px 0px #000' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Sliders size={16} className="text-cyan-400" />
            <span className="text-xs font-bold font-heading text-cyan-400 uppercase tracking-wider">
              Threshold Risiko
            </span>
          </div>

          <div className="space-y-3">
            <ThresholdInput label="Turbidity Warning (NTU)" value={thresholds.turbidityWarning}
              onChange={(v) => setThresholds(prev => ({ ...prev, turbidityWarning: v }))} />
            <ThresholdInput label="Turbidity Danger (NTU)" value={thresholds.turbidityDanger}
              onChange={(v) => setThresholds(prev => ({ ...prev, turbidityDanger: v }))} />
            <ThresholdInput label="pH Minimum" value={thresholds.phMin}
              onChange={(v) => setThresholds(prev => ({ ...prev, phMin: v }))} step={0.1} />
            <ThresholdInput label="pH Maksimum" value={thresholds.phMax}
              onChange={(v) => setThresholds(prev => ({ ...prev, phMax: v }))} step={0.1} />
            <ThresholdInput label="Kedalaman Warning (m)" value={thresholds.depthWarning}
              onChange={(v) => setThresholds(prev => ({ ...prev, depthWarning: v }))} step={0.1} />
            <ThresholdInput label="Kedalaman Danger (m)" value={thresholds.depthDanger}
              onChange={(v) => setThresholds(prev => ({ ...prev, depthDanger: v }))} step={0.1} />
          </div>

          <button
            onClick={() => addToast('success', 'Pengaturan threshold disimpan — Simulasi')}
            className="brutal-btn brutal-btn-primary w-full mt-4 py-2 text-xs flex items-center justify-center gap-2"
          >
            <Save size={14} /> Simpan Pengaturan
          </button>
        </div>

        {/* System Config */}
        <div
          className="brutal-card p-5"
          style={{ background: 'var(--color-surface-2)', border: '3px solid #000', boxShadow: '5px 5px 0px #000' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Settings size={16} className="text-cyan-400" />
            <span className="text-xs font-bold font-heading text-cyan-400 uppercase tracking-wider">
              Konfigurasi Sistem
            </span>
          </div>

          <div className="space-y-3">
            <ProfileRow icon={<Settings size={14} />} label="Versi Sistem" value="AQUA EYE v1.0.0 (Prototype)" />
            <ProfileRow icon={<Settings size={14} />} label="AI Model" value="Computer Vision v2.4 (Simulated)" />
            <ProfileRow icon={<Settings size={14} />} label="Edge Computing" value="Galaxy Upcycling Platform" />
            <ProfileRow icon={<Settings size={14} />} label="Update Interval" value="30 detik (simulated)" />
            <ProfileRow icon={<Settings size={14} />} label="Data Retention" value="90 hari" />
          </div>

          {/* Login History */}
          <div className="mt-4 pt-4" style={{ borderTop: '2px solid #1E3048' }}>
            <div className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Riwayat Login Terakhir</div>
            <div className="space-y-1.5 text-[11px] text-gray-400">
              {[
                { time: '26 Agu 2026, 14:30', ip: '192.168.1.105', device: 'Chrome / Windows' },
                { time: '25 Agu 2026, 08:15', ip: '192.168.1.105', device: 'Chrome / Windows' },
                { time: '24 Agu 2026, 09:00', ip: '10.0.0.42', device: 'Safari / iPad' },
              ].map((log, i) => (
                <div key={i} className="flex justify-between p-1.5" style={{ background: 'var(--color-surface-3)' }}>
                  <span>{log.time}</span>
                  <span className="text-gray-500">{log.ip}</span>
                  <span className="text-gray-500">{log.device}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

function ProfileRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-2" style={{ background: 'var(--color-surface-3)', border: '1px solid #1E3048' }}>
      <div className="text-gray-500">{icon}</div>
      <div className="flex-1">
        <div className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</div>
        <div className="text-xs text-white">{value}</div>
      </div>
    </div>
  );
}

function ThresholdInput({ label, value, onChange, step = 1 }: {
  label: string; value: number; onChange: (v: number) => void; step?: number;
}) {
  return (
    <div className="flex items-center justify-between gap-3 p-2" style={{ background: 'var(--color-surface-3)', border: '1px solid #1E3048' }}>
      <span className="text-xs text-gray-300">{label}</span>
      <input
        type="number"
        value={value}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="brutal-input w-20 px-2 py-1 text-xs text-center"
      />
    </div>
  );
}
