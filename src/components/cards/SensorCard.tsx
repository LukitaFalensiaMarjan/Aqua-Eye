// ============================================================
// AQUA EYE — Sensor Card
// ============================================================

import { getSensorStatus } from '../../utils/aquaSafeIndex';
import type { RiskLevel } from '../../types';

interface SensorCardProps {
  label: string;
  value: number;
  unit: string;
  param: string;
  icon: React.ReactNode;
}

const borderColors: Record<RiskLevel, string> = {
  safe: 'var(--color-safe)',
  caution: 'var(--color-caution)',
  danger: 'var(--color-danger)',
};

export default function SensorCard({ label, value, unit, param, icon }: SensorCardProps) {
  const { status, level } = getSensorStatus(param, value);
  const borderColor = borderColors[level];

  return (
    <div
      className="brutal-card p-4 flex flex-col gap-2"
      style={{
        background: 'var(--color-surface-2)',
        borderColor: borderColor,
        boxShadow: `5px 5px 0px ${borderColor}`,
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{label}</span>
        <div style={{ color: borderColor }}>{icon}</div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold font-heading text-white">{value}</span>
        <span className="text-sm text-gray-400 font-mono">{unit}</span>
      </div>
      <div
        className="text-[10px] font-bold font-mono tracking-widest px-2 py-0.5 self-start"
        style={{
          background: borderColor,
          color: level === 'danger' ? '#fff' : '#000',
          border: '1px solid #000',
        }}
      >
        {status}
      </div>
    </div>
  );
}
