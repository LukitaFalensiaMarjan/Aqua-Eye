// ============================================================
// AQUA EYE — Alert Card
// ============================================================

import type { Alert } from '../../types';
import StatusBadge from '../ui/StatusBadge';
import { MapPin, Clock, Cpu, Eye, ChevronRight } from 'lucide-react';

interface AlertCardProps {
  alert: Alert;
  onViewDetail: (alert: Alert) => void;
  onVerify?: (id: string) => void;
  onResolve?: (id: string) => void;
}

export default function AlertCard({ alert, onViewDetail, onVerify, onResolve }: AlertCardProps) {
  const borderColor =
    alert.severity === 'emergency'
      ? 'var(--color-emergency)'
      : alert.severity === 'danger'
        ? 'var(--color-danger)'
        : alert.severity === 'caution'
          ? 'var(--color-caution)'
          : 'var(--color-safe)';

  return (
    <div
      className="brutal-card p-4 cursor-pointer"
      style={{
        background: 'var(--color-surface-2)',
        borderColor,
        boxShadow: `5px 5px 0px ${borderColor}`,
      }}
      onClick={() => onViewDetail(alert)}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <StatusBadge status={alert.severity} size="sm" />
            <StatusBadge status={alert.status} size="sm" />
          </div>
          <h4 className="text-sm font-bold text-white font-heading mt-2">{alert.title}</h4>
        </div>
        <ChevronRight size={18} className="text-gray-500 flex-shrink-0 mt-1" />
      </div>

      <p className="text-xs text-gray-400 mb-3 line-clamp-2">{alert.description}</p>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-500">
        <span className="flex items-center gap-1">
          <MapPin size={12} /> {alert.location}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={12} /> {new Date(alert.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
        </span>
        <span className="flex items-center gap-1">
          <Cpu size={12} /> {alert.deviceId}
        </span>
        <span className="flex items-center gap-1">
          <Eye size={12} /> {Math.round(alert.confidence * 100)}%
        </span>
      </div>

      {/* Actions */}
      {alert.status === 'active' && (
        <div className="flex gap-2 mt-3 pt-3" style={{ borderTop: '2px solid #1E3048' }}>
          {onVerify && (
            <button
              onClick={(e) => { e.stopPropagation(); onVerify(alert.id); }}
              className="brutal-btn brutal-btn-primary text-[10px] px-3 py-1"
            >
              Verifikasi
            </button>
          )}
          {onResolve && (
            <button
              onClick={(e) => { e.stopPropagation(); onResolve(alert.id); }}
              className="brutal-btn brutal-btn-safe text-[10px] px-3 py-1"
            >
              Selesai
            </button>
          )}
        </div>
      )}
    </div>
  );
}
