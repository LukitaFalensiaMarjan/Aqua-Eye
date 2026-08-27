// ============================================================
// AQUA EYE — AI Insight Card
// ============================================================

import type { SafetyAssessment } from '../../types';
import { Brain, ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';

interface AIInsightCardProps {
  assessment: SafetyAssessment;
}

const statusColors: Record<string, string> = {
  NORMAL: 'var(--color-safe)',
  MODERATE: 'var(--color-caution)',
  HIGH: 'var(--color-danger)',
  CRITICAL: 'var(--color-emergency)',
};

export default function AIInsightCard({ assessment }: AIInsightCardProps) {
  return (
    <div className="space-y-4">
      {/* Factors */}
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
            Faktor Kontribusi
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
                    color: f.status === 'NORMAL' || f.status === 'MODERATE' ? '#000' : '#fff',
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

      {/* AI Reasoning */}
      <div
        className="brutal-card p-4"
        style={{
          background: 'var(--color-surface-2)',
          border: '3px solid var(--color-aqua-blue)',
          boxShadow: '5px 5px 0px var(--color-aqua-blue)',
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <ShieldAlert size={16} className="text-blue-400" />
          <span className="text-xs font-bold font-heading text-blue-400 uppercase tracking-wider">
            Alasan AI
          </span>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed italic">
          "{assessment.reasoning}"
        </p>
      </div>

      {/* Recommendations */}
      <div
        className="brutal-card p-4"
        style={{
          background: 'var(--color-surface-2)',
          border: '3px solid #000',
          boxShadow: '5px 5px 0px #000',
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle size={16} className="text-green-400" />
          <span className="text-xs font-bold font-heading text-green-400 uppercase tracking-wider">
            Rekomendasi
          </span>
        </div>
        <ul className="space-y-2">
          {assessment.recommendations.map((rec, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
              <AlertTriangle size={14} className="flex-shrink-0 mt-0.5 text-yellow-500" />
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Prototype Note */}
      <div className="text-[10px] font-mono text-gray-500 px-2 leading-relaxed">
        <span className="text-yellow-600">⚠</span> Skor pada prototype menggunakan simulasi logika penilaian untuk demonstrasi konsep. Bobot final ditentukan berdasarkan validasi lapangan.
      </div>
    </div>
  );
}
