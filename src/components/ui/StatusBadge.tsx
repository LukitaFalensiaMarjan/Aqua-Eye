// ============================================================
// AQUA EYE — Status Badge
// ============================================================

import type { RiskLevel, AlertSeverity } from '../../types';

interface StatusBadgeProps {
  status: RiskLevel | AlertSeverity | string;
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
}

const colorMap: Record<string, { bg: string; text: string; border: string; shadow: string }> = {
  safe: { bg: '#84CC16', text: '#000', border: '#000', shadow: '#84CC16' },
  caution: { bg: '#FACC15', text: '#000', border: '#000', shadow: '#FACC15' },
  danger: { bg: '#EF4444', text: '#fff', border: '#000', shadow: '#EF4444' },
  emergency: { bg: '#FF0040', text: '#fff', border: '#000', shadow: '#FF0040' },
  online: { bg: '#84CC16', text: '#000', border: '#000', shadow: '#84CC16' },
  offline: { bg: '#64748b', text: '#fff', border: '#000', shadow: '#64748b' },
  warning: { bg: '#FACC15', text: '#000', border: '#000', shadow: '#FACC15' },
  active: { bg: '#0066FF', text: '#fff', border: '#000', shadow: '#0066FF' },
  verified: { bg: '#00D4FF', text: '#000', border: '#000', shadow: '#00D4FF' },
  resolved: { bg: '#64748b', text: '#fff', border: '#000', shadow: '#64748b' },
};

const labelMap: Record<string, string> = {
  safe: 'SAFE',
  caution: 'CAUTION',
  danger: 'DANGER',
  emergency: 'EMERGENCY',
  online: 'ONLINE',
  offline: 'OFFLINE',
  warning: 'WARNING',
  active: 'AKTIF',
  verified: 'TERVERIFIKASI',
  resolved: 'SELESAI',
};

const sizeMap = {
  sm: 'text-[10px] px-2 py-0.5',
  md: 'text-xs px-3 py-1',
  lg: 'text-sm px-4 py-1.5',
};

export default function StatusBadge({ status, size = 'md', pulse }: StatusBadgeProps) {
  const colors = colorMap[status] || colorMap.safe;
  const label = labelMap[status] || status.toUpperCase();

  return (
    <span
      className={`brutal-badge ${sizeMap[size]} ${pulse ? 'animate-pulse' : ''}`}
      style={{
        background: colors.bg,
        color: colors.text,
        borderColor: colors.border,
        boxShadow: `3px 3px 0px ${colors.border}`,
      }}
    >
      {label}
    </span>
  );
}
