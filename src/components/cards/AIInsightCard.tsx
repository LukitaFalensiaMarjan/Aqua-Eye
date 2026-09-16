// ============================================================
// AQUA EYE — AI Insight Card (Dual Output: ASI-E + VHA)
// ============================================================

import type { SafetyAssessment } from '../../types';
import {
  Brain, ShieldAlert, CheckCircle, AlertTriangle,
  Cpu, Camera, HardHat, ClipboardList, ChevronRight,
} from 'lucide-react';

interface AIInsightCardProps {
  assessment: SafetyAssessment;
}

const statusColors: Record<string, string> = {
  MINIM: 'var(--color-safe)',
  SEDANG: 'var(--color-caution)',
  'CUKUP TINGGI': 'var(--color-danger)',
  TINGGI: 'var(--color-emergency)',
};

const riskBgMap = {
  safe: { bg: 'var(--color-safe)', text: '#000', label: 'RISIKO RENDAH' },
  caution: { bg: 'var(--color-caution)', text: '#000', label: 'RISIKO SEDANG' },
  danger: { bg: 'var(--color-danger)', text: '#fff', label: 'RISIKO TINGGI' },
} as const;

export default function AIInsightCard({ assessment }: AIInsightCardProps) {
  const riskStyle = riskBgMap[assessment.risk];

  return (
    <div className="space-y-3">

      {/* ── 1. Faktor Kontribusi ─────────────────────────── */}
      <div
        className="brutal-card p-4"
        style={{
          background: 'var(--color-surface-2)',
          border: '3px solid #000',
          boxShadow: '5px 5px 0px #000',
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Brain size={16} className="text-cyan-400" />
          <span className="text-xs font-bold font-heading text-cyan-400 uppercase tracking-wider">
            Faktor Kontribusi Risiko
          </span>
        </div>
        <div className="space-y-2">
          {assessment.factors.map((f) => (
            <div key={f.parameter} className="flex items-center justify-between py-1.5"
              style={{ borderBottom: '1px solid #1E3048' }}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300">{f.parameter}</span>
                <span className="text-xs font-mono text-gray-500">{f.value}</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="h-2 rounded-none"
                  style={{
                    width: `${Math.max(f.contribution * 2, 8)}px`,
                    background: statusColors[f.status],
                    border: '1px solid #000',
                  }}
                />
                <span
                  className="text-[10px] font-bold font-mono tracking-wider px-1.5 py-0.5"
                  style={{
                    background: statusColors[f.status],
                    color: f.status === 'MINIM' || f.status === 'SEDANG' ? '#000' : '#fff',
                    border: '1px solid #000',
                  }}
                >
                  {f.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 2. ASI-E: Kesimpulan Sensor ─────────────────── */}
      <div
        className="brutal-card p-4"
        style={{
          background: 'var(--color-surface-2)',
          border: '3px solid var(--color-aqua-blue)',
          boxShadow: '5px 5px 0px var(--color-aqua-blue)',
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Cpu size={14} className="text-blue-400" />
          <span className="text-[10px] font-bold font-heading text-blue-400 uppercase tracking-wider">
            ASI-E — Analisis Parameter Sensor
          </span>
          <div
            className="ml-auto px-2 py-0.5 text-[9px] font-black font-heading tracking-wider"
            style={{ background: riskStyle.bg, color: riskStyle.text, border: '2px solid #000' }}
          >
            {riskStyle.label}
          </div>
        </div>
        <p className="text-sm text-gray-200 leading-relaxed">
          {assessment.sensorConclusion}
        </p>
      </div>

      {/* ── 3. VHA: Kesimpulan Visual ───────────────────── */}
      <div
        className="brutal-card p-4"
        style={{
          background: 'var(--color-surface-2)',
          border: '3px solid #7C3AED',
          boxShadow: '5px 5px 0px #7C3AED',
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Camera size={14} className="text-purple-400" />
          <span className="text-[10px] font-bold font-heading text-purple-400 uppercase tracking-wider">
            VHA — Analisis Visual Kamera
          </span>
        </div>
        <p className="text-sm text-gray-200 leading-relaxed">
          {assessment.visualConclusion}
        </p>
      </div>

      {/* ── 4. Rekomendasi APD ──────────────────────────── */}
      <div
        className="brutal-card p-4"
        style={{
          background: 'var(--color-surface-2)',
          border: '3px solid var(--color-caution)',
          boxShadow: '5px 5px 0px var(--color-caution)',
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <HardHat size={16} className="text-yellow-400" />
          <span className="text-xs font-bold font-heading text-yellow-400 uppercase tracking-wider">
            Rekomendasi APD
          </span>
        </div>
        <ul className="space-y-1.5">
          {assessment.apdRecommendations.map((apd, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
              <ChevronRight size={14} className="flex-shrink-0 mt-0.5 text-yellow-500" />
              <span>{apd}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Prototype Note ──────────────────────────────── */}
      <div className="flex items-start gap-2 text-[10px] font-mono text-gray-500 px-2 leading-relaxed">
        <ShieldAlert size={12} className="flex-shrink-0 mt-0.5 text-yellow-600" />
        <span>Skor pada prototype menggunakan simulasi logika penilaian untuk demonstrasi konsep. Bobot final ditentukan berdasarkan validasi lapangan.</span>
      </div>
    </div>
  );
}
