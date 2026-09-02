// ============================================================
// AQUA EYE — Role Selection / Login Page
// ============================================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Smartphone, Waves, LogIn, AlertCircle } from 'lucide-react';
import logoAquaEye from '../assets/logo_aqua_eye.png';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Masukkan username dan password.');
      return;
    }

    if (login(username, password)) {
      if (username === 'operator') navigate('/operator/dashboard');
      if (username === 'warga') navigate('/warga/beranda');
    } else {
      setError('Username atau password salah.');
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
      <div className="absolute bottom-20 right-16 w-16 h-16 hidden lg:block"
        style={{ background: 'var(--color-caution)', border: '3px solid #000', boxShadow: '5px 5px 0px #000', opacity: 0.5 }} />
      <div className="absolute top-1/2 right-20 w-24 h-24 hidden xl:block"
        style={{ background: 'var(--color-aqua-cyan)', border: '3px solid #000', boxShadow: '6px 6px 0px #000', opacity: 0.15 }} />

      <div className="relative z-10 max-w-4xl w-full">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div
              className="w-16 h-16 flex items-center justify-center p-0.5"
              style={{
                background: 'var(--color-surface-1)',
                border: '4px solid #000',
                boxShadow: '6px 6px 0px #000',
              }}
            >
              <img src={logoAquaEye} alt="AQUA EYE Logo" className="w-full h-full object-cover" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-heading text-white tracking-tight mb-2">
            AQUA EYE
          </h1>
          <p className="text-xs font-mono text-cyan-400 tracking-[0.3em] mb-4">
            AI WATER SAFETY ASSESSMENT
          </p>
          <div className="inline-block px-4 py-1 text-xs font-bold bg-yellow-400 text-black border-2 border-black shadow-[3px_3px_0_0_#000]">
            MODE SIMULASI PROTOTYPE
          </div>
        </div>

        {/* Login Form */}
        <div className="max-w-md mx-auto relative z-20">
          <form 
            onSubmit={handleLogin}
            className="bg-[var(--color-surface-2)] p-6 md:p-8 flex flex-col gap-5 relative"
            style={{
              border: '4px solid #000',
              boxShadow: '8px 8px 0px #000',
            }}
          >
            <div className="absolute -top-4 -right-4 bg-yellow-400 border-2 border-black p-2 shadow-[2px_2px_0_0_#000] rotate-6 hidden md:block">
              <span className="font-black font-mono text-[10px] text-black uppercase">Secure Access</span>
            </div>

            <div className="text-center mb-2">
              <h2 className="font-heading font-black text-2xl text-white mb-1">MASUK SISTEM</h2>
              <p className="text-xs text-gray-400">Gunakan akun Operator atau Warga.</p>
            </div>

            {error && (
              <div className="bg-red-500/20 border-2 border-red-500 p-3 flex items-start gap-2">
                <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                <span className="text-xs text-red-200 font-bold">{error}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-cyan-400 mb-1 font-mono tracking-wider uppercase">Username</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Contoh: operator1 / warga_bdg"
                  className="w-full bg-[var(--color-surface-1)] border-2 border-black px-4 py-3 text-white font-bold placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:shadow-[4px_4px_0_0_#00D4FF] transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-cyan-400 mb-1 font-mono tracking-wider uppercase">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[var(--color-surface-1)] border-2 border-black px-4 py-3 text-white font-bold placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:shadow-[4px_4px_0_0_#00D4FF] transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="mt-2 w-full bg-cyan-400 hover:bg-cyan-500 text-black border-2 border-black py-4 font-black font-heading text-lg flex items-center justify-center gap-2 shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] active:translate-y-0 active:shadow-[2px_2px_0_0_#000] transition-all"
            >
              <LogIn size={20} />
              LOGIN SEKARANG
            </button>
            
            <div className="text-[9px] text-gray-500 text-center font-mono mt-2 bg-[var(--color-surface-1)] p-2 border border-gray-800">
              * Demo mode credentials:<br/>
              Operator: username = <strong>operator</strong>, password = <strong>sft2026</strong><br/>
              Warga: username = <strong>warga</strong>, password = <strong>sft2026</strong>
            </div>
          </form>
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap gap-3 justify-center mt-12">
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
      </div>
    </div>
  );
}
