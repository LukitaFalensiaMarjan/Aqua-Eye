// ============================================================
// AQUA EYE — Login Page
// ============================================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Droplets, Eye, EyeOff, Smartphone, Waves, Shield } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/dashboard');
    } else {
      setError('Username atau password salah');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'var(--color-aqua-dark)' }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent 0px, transparent 40px, #00D4FF 40px, #00D4FF 41px),
          repeating-linear-gradient(90deg, transparent 0px, transparent 40px, #00D4FF 40px, #00D4FF 41px)
        `,
      }} />

      {/* Decorative blocks */}
      <div className="absolute top-10 left-10 w-20 h-20 hidden lg:block"
        style={{ background: 'var(--color-aqua-blue)', border: '3px solid #000', boxShadow: '6px 6px 0px #000', opacity: 0.6 }} />
      <div className="absolute top-32 left-32 w-12 h-12 hidden lg:block"
        style={{ background: 'var(--color-safe)', border: '3px solid #000', boxShadow: '4px 4px 0px #000', opacity: 0.4 }} />
      <div className="absolute bottom-20 right-16 w-16 h-16 hidden lg:block"
        style={{ background: 'var(--color-caution)', border: '3px solid #000', boxShadow: '5px 5px 0px #000', opacity: 0.5 }} />
      <div className="absolute bottom-40 right-40 w-8 h-8 hidden lg:block"
        style={{ background: 'var(--color-danger)', border: '2px solid #000', boxShadow: '3px 3px 0px #000', opacity: 0.4 }} />
      <div className="absolute top-1/2 right-20 w-24 h-24 hidden xl:block"
        style={{ background: 'var(--color-aqua-cyan)', border: '3px solid #000', boxShadow: '6px 6px 0px #000', opacity: 0.15 }} />

      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10 max-w-5xl w-full">
        {/* Left - Branding */}
        <div className="flex-1 text-center lg:text-left">
          {/* Logo */}
          <div className="flex items-center gap-4 justify-center lg:justify-start mb-6">
            <div
              className="w-16 h-16 flex items-center justify-center"
              style={{
                background: 'var(--color-aqua-blue)',
                border: '4px solid #000',
                boxShadow: '6px 6px 0px #000',
              }}
            >
              <Droplets size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black font-heading text-white tracking-tight">
                AQUA EYE
              </h1>
              <p className="text-xs font-mono text-cyan-400 tracking-[0.3em]">
                AI WATER SAFETY ASSESSMENT
              </p>
            </div>
          </div>

          <p className="text-lg text-gray-300 max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed">
            Sistem penilaian keselamatan air berbasis AI untuk pembersihan sungai dan respons darurat.
          </p>

          {/* Feature badges */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
            {[
              { icon: Shield, label: 'AI Safety Assessment', color: 'var(--color-aqua-blue)' },
              { icon: Waves, label: 'River Monitoring', color: 'var(--color-aqua-cyan)' },
              { icon: Smartphone, label: 'Galaxy Upcycling', color: 'var(--color-safe)' },
            ].map((feat) => (
              <div
                key={feat.label}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold"
                style={{
                  background: 'var(--color-surface-2)',
                  border: '2px solid #000',
                  boxShadow: '3px 3px 0px #000',
                  color: feat.color,
                }}
              >
                <feat.icon size={14} />
                {feat.label}
              </div>
            ))}
          </div>

          {/* Galaxy device illustration */}
          <div className="hidden lg:flex items-center gap-4 mt-4">
            <div className="galaxy-frame">
              <div className="galaxy-frame-screen" style={{ background: 'linear-gradient(180deg, #0066FF20, #00D4FF20)' }}>
                <div className="flex flex-col items-center justify-center h-full gap-1">
                  <Droplets size={16} className="text-cyan-400" />
                  <span className="text-[6px] font-mono text-cyan-400">EDGE AI</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 max-w-[200px]">
              <div className="font-bold text-gray-400 mb-1">Galaxy Upcycling</div>
              Old Galaxy → Edge AI Device untuk pemantauan sungai real-time
            </div>
          </div>
        </div>

        {/* Right - Login Form */}
        <div className="w-full max-w-sm">
          <form
            onSubmit={handleSubmit}
            className="p-6"
            style={{
              background: 'var(--color-surface-1)',
              border: '4px solid #000',
              boxShadow: '8px 8px 0px #000',
            }}
          >
            <h2 className="text-xl font-bold font-heading text-white mb-1">
              Masuk ke Sistem
            </h2>
            <p className="text-xs text-gray-400 mb-6">
              Akses dashboard pemantauan AQUA EYE
            </p>

            {error && (
              <div
                className="mb-4 px-3 py-2 text-xs font-bold"
                style={{
                  background: 'var(--color-danger)',
                  border: '2px solid #000',
                  color: '#fff',
                }}
              >
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold font-mono text-gray-400 mb-1.5 uppercase tracking-wider">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="brutal-input w-full px-3 py-2.5 text-sm"
                  placeholder="Masukkan username"
                />
              </div>

              <div>
                <label className="block text-xs font-bold font-mono text-gray-400 mb-1.5 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="brutal-input w-full px-3 py-2.5 text-sm pr-10"
                    placeholder="Masukkan password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white p-1"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="brutal-btn brutal-btn-primary w-full py-3 text-sm"
              >
                MASUK
              </button>
            </div>

            {/* Demo credentials hint */}
            <div
              className="mt-4 px-3 py-2 text-[10px] font-mono text-gray-400"
              style={{
                background: 'var(--color-surface-0)',
                border: '2px solid #1E3048',
              }}
            >
              <div className="text-cyan-400 font-bold mb-1">DEMO CREDENTIALS</div>
              <div>Username: <span className="text-white">operator</span></div>
              <div>Password: <span className="text-white">aquaeye2026</span></div>
            </div>
          </form>

          {/* Prototype tag */}
          <div className="text-center mt-4">
            <span
              className="text-[9px] font-mono tracking-widest px-3 py-1 inline-block"
              style={{
                background: 'var(--color-caution)',
                color: '#000',
                border: '2px solid #000',
                boxShadow: '3px 3px 0px #000',
              }}
            >
              SIMULASI PROTOTYPE • SAMSUNG SOLVE FOR TOMORROW 2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
