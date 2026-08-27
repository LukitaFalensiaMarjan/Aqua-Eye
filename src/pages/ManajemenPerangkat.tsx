// ============================================================
// AQUA EYE — Manajemen Perangkat Page
// ============================================================

import { useState } from 'react';
import { mockDevices } from '../data/devices';
import PageContainer from '../components/layout/PageContainer';
import DeviceCard from '../components/cards/DeviceCard';
import Modal from '../components/ui/Modal';
import StatusBadge from '../components/ui/StatusBadge';
import { useToast } from '../components/ui/Toast';
import type { Device } from '../types';
import { Smartphone, Battery, MapPin, Camera, Wifi, Clock, Settings, Power, RefreshCw, Cpu } from 'lucide-react';

export default function ManajemenPerangkat() {
  const { addToast } = useToast();
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const onlineCount = mockDevices.filter(d => d.status === 'online').length;

  return (
    <PageContainer
      title="Manajemen Perangkat"
      subtitle={`${onlineCount}/${mockDevices.length} perangkat online — Galaxy Upcycling`}
    >
      {/* Galaxy Upcycling Info */}
      <div
        className="brutal-card p-4 mb-5 flex flex-col md:flex-row items-start md:items-center gap-4"
        style={{
          background: 'var(--color-surface-2)',
          border: '3px solid var(--color-aqua-cyan)',
          boxShadow: '6px 6px 0px var(--color-aqua-cyan)',
        }}
      >
        <div className="flex items-center gap-3">
          {/* Galaxy device visual */}
          <div className="galaxy-frame flex-shrink-0">
            <div className="galaxy-frame-screen" style={{ background: 'linear-gradient(180deg, #0066FF30, #00D4FF30)' }}>
              <div className="flex flex-col items-center justify-center h-full gap-0.5">
                <Cpu size={14} className="text-cyan-400" />
                <span className="text-[5px] font-mono text-cyan-400 tracking-wider">EDGE AI</span>
                <span className="text-[5px] font-mono text-green-400">● ONLINE</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold font-heading text-white mb-1">
              Powered by Galaxy Upcycling
            </h3>
            <p className="text-xs text-gray-400 max-w-md">
              Perangkat Samsung Galaxy yang tidak terpakai ditransformasi menjadi Edge AI device
              untuk pemantauan sungai real-time dengan kemampuan Computer Vision dan sensor processing.
            </p>
          </div>
        </div>
      </div>

      {/* Device Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockDevices.map(device => (
          <DeviceCard
            key={device.id}
            device={device}
            onDetail={setSelectedDevice}
          />
        ))}
      </div>

      {/* Device Detail Modal */}
      <Modal
        isOpen={!!selectedDevice}
        onClose={() => setSelectedDevice(null)}
        title={selectedDevice ? `${selectedDevice.id} — ${selectedDevice.name}` : ''}
        size="lg"
      >
        {selectedDevice && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <StatusBadge status={selectedDevice.status} />
              <span className="text-xs font-mono text-gray-400">{selectedDevice.type.toUpperCase()}</span>
            </div>

            {/* Device Info Grid */}
            <div className="grid grid-cols-2 gap-3">
              <InfoRow icon={<Smartphone size={14} />} label="Galaxy Model" value={selectedDevice.galaxyModel} />
              <InfoRow icon={<Battery size={14} />} label="Baterai" value={`${selectedDevice.battery}%`}
                valueColor={selectedDevice.battery > 50 ? 'var(--color-safe)' : selectedDevice.battery > 20 ? 'var(--color-caution)' : 'var(--color-danger)'} />
              <InfoRow icon={<MapPin size={14} />} label="GPS" value={selectedDevice.gpsActive ? 'Aktif' : 'Nonaktif'} />
              <InfoRow icon={<Camera size={14} />} label="Kamera" value={selectedDevice.cameraStatus.toUpperCase()}
                valueColor={selectedDevice.cameraStatus === 'online' ? 'var(--color-safe)' : 'var(--color-danger)'} />
              <InfoRow icon={<Wifi size={14} />} label="Sensor" value={selectedDevice.sensorStatus.toUpperCase()}
                valueColor={selectedDevice.sensorStatus === 'online' ? 'var(--color-safe)' : 'var(--color-danger)'} />
              <InfoRow icon={<Settings size={14} />} label="Firmware" value={selectedDevice.firmwareVersion} />
              <InfoRow icon={<MapPin size={14} />} label="Lokasi" value={selectedDevice.location} />
              <InfoRow icon={<Clock size={14} />} label="Update Terakhir" value={new Date(selectedDevice.lastUpdate).toLocaleString('id-ID')} />
            </div>

            {/* Coordinates */}
            <div className="text-xs font-mono text-gray-400 p-2" style={{ background: 'var(--color-surface-3)' }}>
              GPS: {selectedDevice.coordinates.lat.toFixed(4)}, {selectedDevice.coordinates.lng.toFixed(4)}
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2" style={{ borderTop: '2px solid #1E3048' }}>
              <button
                onClick={() => addToast('info', `Detail ${selectedDevice.id} dibuka`)}
                className="brutal-btn brutal-btn-primary py-2 text-[10px] flex items-center justify-center gap-1"
              >
                <Settings size={12} /> Detail
              </button>
              <button
                onClick={() => addToast('info', `Kalibrasi ${selectedDevice.id} dimulai`)}
                className="brutal-btn brutal-btn-caution py-2 text-[10px] flex items-center justify-center gap-1"
              >
                <RefreshCw size={12} /> Kalibrasi
              </button>
              <button
                onClick={() => addToast('success', `${selectedDevice.id} diaktifkan`)}
                className="brutal-btn brutal-btn-safe py-2 text-[10px] flex items-center justify-center gap-1"
              >
                <Power size={12} /> Aktifkan
              </button>
              <button
                onClick={() => addToast('warning', `${selectedDevice.id} dinonaktifkan`)}
                className="brutal-btn brutal-btn-danger py-2 text-[10px] flex items-center justify-center gap-1"
              >
                <Power size={12} /> Nonaktifkan
              </button>
            </div>
          </div>
        )}
      </Modal>
    </PageContainer>
  );
}

function InfoRow({ icon, label, value, valueColor }: {
  icon: React.ReactNode; label: string; value: string; valueColor?: string;
}) {
  return (
    <div className="flex items-center gap-2 p-2" style={{ background: 'var(--color-surface-3)', border: '1px solid #1E3048' }}>
      <div className="text-gray-500">{icon}</div>
      <div>
        <div className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</div>
        <div className="text-xs font-bold text-white" style={valueColor ? { color: valueColor } : {}}>{value}</div>
      </div>
    </div>
  );
}
