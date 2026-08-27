// ============================================================
// AQUA EYE — Metric Card (Dashboard summary cards)
// ============================================================

import type { ReactNode } from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  color?: string;
  borderColor?: string;
}

export default function MetricCard({ label, value, subtitle, icon, color = 'var(--color-aqua-cyan)', borderColor = '#000' }: MetricCardProps) {
  return (
    <div
      className="brutal-card p-4"
      style={{
        background: 'var(--color-surface-2)',
        borderColor,
        boxShadow: `5px 5px 0px ${borderColor}`,
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{label}</span>
        <div style={{ color }}>{icon}</div>
      </div>
      <div className="text-3xl font-black font-heading text-white" style={{ color }}>{value}</div>
      {subtitle && (
        <div className="text-xs text-gray-400 mt-1">{subtitle}</div>
      )}
    </div>
  );
}
