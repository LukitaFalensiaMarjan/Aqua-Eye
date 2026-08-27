// ============================================================
// AQUA EYE — Alert Center Page
// ============================================================

import { useState } from 'react';
import { useAlerts } from '../context/AlertContext';
import PageContainer from '../components/layout/PageContainer';
import AlertCard from '../components/cards/AlertCard';
import Modal from '../components/ui/Modal';
import StatusBadge from '../components/ui/StatusBadge';
import { useToast } from '../components/ui/Toast';
import type { Alert } from '../types';
import { MapPin, Clock, Cpu, Eye, Brain, Send, CheckCircle, Shield } from 'lucide-react';

type FilterKey = 'semua' | 'active' | 'resolved' | 'danger' | 'caution';

export default function AlertCenter() {
  const { alerts, updateAlertStatus } = useAlerts();
  const { addToast } = useToast();
  const [filter, setFilter] = useState<FilterKey>('semua');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const filteredAlerts = alerts.filter(a => {
    if (filter === 'semua') return true;
    if (filter === 'active') return a.status === 'active';
    if (filter === 'resolved') return a.status === 'resolved';
    if (filter === 'danger') return a.severity === 'danger' || a.severity === 'emergency';
    if (filter === 'caution') return a.severity === 'caution';
    return true;
  });

  const handleVerify = (id: string) => {
    updateAlertStatus(id, 'verified');
    addToast('info', 'Alert telah diverifikasi');
  };

  const handleResolve = (id: string) => {
    updateAlertStatus(id, 'resolved');
    addToast('success', 'Alert ditandai selesai');
    setSelectedAlert(null);
  };

  const filters: { key: FilterKey; label: string }[] = [
    { key: 'semua', label: 'Semua' },
    { key: 'active', label: 'Aktif' },
    { key: 'resolved', label: 'Selesai' },
    { key: 'danger', label: 'Danger' },
    { key: 'caution', label: 'Caution' },
  ];

  const activeCount = alerts.filter(a => a.status === 'active').length;
  const resolvedCount = alerts.filter(a => a.status === 'resolved').length;

  return (
    <PageContainer
      title="Alert Center"
      subtitle={`${activeCount} peringatan aktif • ${resolvedCount} selesai`}
      actions={
        <div className="flex gap-1">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="px-3 py-1.5 text-[10px] font-bold font-heading uppercase tracking-wider transition-all"
              style={filter === f.key ? {
                background: 'var(--color-aqua-blue)',
                color: '#fff',
                border: '2px solid #000',
                boxShadow: '3px 3px 0px #000',
              } : {
                background: 'var(--color-surface-3)',
                color: '#94a3b8',
                border: '2px solid #1E3048',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      }
    >
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total', count: alerts.length, color: 'var(--color-aqua-cyan)' },
          { label: 'Aktif', count: activeCount, color: 'var(--color-danger)' },
          { label: 'Terverifikasi', count: alerts.filter(a => a.status === 'verified').length, color: 'var(--color-caution)' },
          { label: 'Selesai', count: resolvedCount, color: 'var(--color-safe)' },
        ].map(s => (
          <div
            key={s.label}
            className="brutal-card p-3 text-center"
            style={{ background: 'var(--color-surface-2)', border: '3px solid #000', boxShadow: '4px 4px 0px #000' }}
          >
            <div className="text-2xl font-black font-heading" style={{ color: s.color }}>{s.count}</div>
            <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Alert List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filteredAlerts.map(alert => (
          <AlertCard
            key={alert.id}
            alert={alert}
            onViewDetail={setSelectedAlert}
            onVerify={alert.status === 'active' ? handleVerify : undefined}
            onResolve={alert.status !== 'resolved' ? handleResolve : undefined}
          />
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="text-center py-16">
          <Shield size={48} className="text-gray-600 mx-auto mb-3" />
          <div className="text-sm font-bold text-gray-400">Tidak ada alert untuk filter ini</div>
        </div>
      )}

      {/* Alert Detail Modal */}
      <Modal
        isOpen={!!selectedAlert}
        onClose={() => setSelectedAlert(null)}
        title={selectedAlert?.title || ''}
        size="lg"
      >
        {selectedAlert && (
          <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              <StatusBadge status={selectedAlert.severity} />
              <StatusBadge status={selectedAlert.status} />
              <span className="brutal-badge text-[10px] px-2 py-0.5" style={{ background: 'var(--color-surface-3)', color: '#94a3b8', border: '2px solid #1E3048' }}>
                {selectedAlert.category.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            <p className="text-sm text-gray-300">{selectedAlert.description}</p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={14} /> {selectedAlert.location}
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock size={14} /> {new Date(selectedAlert.timestamp).toLocaleString('id-ID')}
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Cpu size={14} /> {selectedAlert.deviceId}
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Eye size={14} /> Confidence: {Math.round(selectedAlert.confidence * 100)}%
              </div>
            </div>

            {/* AI Reasoning */}
            <div
              className="p-3"
              style={{
                background: 'var(--color-surface-3)',
                border: '2px solid var(--color-aqua-blue)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Brain size={14} className="text-blue-400" />
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Alasan AI</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">{selectedAlert.aiReason}</p>
            </div>

            {/* Coordinates */}
            <div className="text-xs font-mono text-gray-400">
              GPS: {selectedAlert.coordinates.lat.toFixed(4)}, {selectedAlert.coordinates.lng.toFixed(4)}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2" style={{ borderTop: '2px solid #1E3048' }}>
              {selectedAlert.status === 'active' && (
                <button
                  onClick={() => handleVerify(selectedAlert.id)}
                  className="brutal-btn brutal-btn-primary flex-1 py-2 text-xs flex items-center justify-center gap-2"
                >
                  <CheckCircle size={14} /> Verifikasi
                </button>
              )}
              {selectedAlert.status !== 'resolved' && (
                <button
                  onClick={() => handleResolve(selectedAlert.id)}
                  className="brutal-btn brutal-btn-safe flex-1 py-2 text-xs flex items-center justify-center gap-2"
                >
                  <CheckCircle size={14} /> Tandai Selesai
                </button>
              )}
              <button
                onClick={() => addToast('info', 'Notifikasi dikirim ke tim lapangan')}
                className="brutal-btn flex-1 py-2 text-xs flex items-center justify-center gap-2"
                style={{ background: 'var(--color-aqua-cyan)', color: '#000', border: '3px solid #000', boxShadow: '4px 4px 0px #000' }}
              >
                <Send size={14} /> Kirim ke Tim
              </button>
            </div>
          </div>
        )}
      </Modal>
    </PageContainer>
  );
}
