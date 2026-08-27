// ============================================================
// AQUA EYE — AQUA SAFE Index Gauge (Risk Card)
// ============================================================

import type { RiskLevel } from '../../types';

interface RiskCardProps {
  score: number;
  risk: RiskLevel;
  showLabel?: boolean;
}

const riskColors: Record<RiskLevel, string> = {
  safe: '#84CC16',
  caution: '#FACC15',
  danger: '#EF4444',
};

const riskLabels: Record<RiskLevel, string> = {
  safe: 'SAFE',
  caution: 'CAUTION',
  danger: 'DANGER',
};

export default function RiskCard({ score, risk, showLabel = true }: RiskCardProps) {
  const color = riskColors[risk];
  const circumference = 2 * Math.PI * 56;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Gauge */}
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 128 128" className="w-full h-full -rotate-90">
          {/* Background ring */}
          <circle
            cx="64"
            cy="64"
            r="56"
            fill="none"
            stroke="#1E3048"
            strokeWidth="10"
          />
          {/* Value ring */}
          <circle
            cx="64"
            cy="64"
            r="56"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="butt"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="gauge-ring"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-4xl font-black font-heading"
            style={{ color }}
          >
            {score}
          </span>
          <span className="text-[10px] font-mono text-gray-400">/100</span>
        </div>
      </div>

      {/* Label */}
      {showLabel && (
        <div
          className="px-4 py-1.5 text-sm font-black font-heading tracking-widest"
          style={{
            background: color,
            color: risk === 'danger' ? '#fff' : '#000',
            border: '3px solid #000',
            boxShadow: '4px 4px 0px #000',
          }}
        >
          {riskLabels[risk]}
        </div>
      )}
    </div>
  );
}
