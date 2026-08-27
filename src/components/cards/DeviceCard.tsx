// ============================================================
// AQUA EYE — Device Card
// ============================================================

import type { Device } from '../../types';
import StatusBadge from '../ui/StatusBadge';
import { Battery, MapPin, Camera, Wifi, Smartphone, Clock } from 'lucide-react';

interface DeviceCardProps {
  device: Device;
  onDetail: (device: Device) => void;
}

export default function DeviceCard({ device, onDetail }: DeviceCardProps) {
  const batteryColor =
    device.battery > 50 ? 'var(--color-safe)' :
    device.battery > 20 ? 'var(--color-caution)' :
    'var(--color-danger)';

  return (
    <div
      className="brutal-card p-4 cursor-pointer"
      style={{
        background: 'var(--color-surface-2)',
        border: '3px solid #000',
        boxShadow: '5px 5px 0px #000',
      }}
      onClick={() => onDetail(device)}
    >
      <div className="flex items-start gap-4">
        {/* Galaxy Device Icon */}
        <div
          className="w-14 h-24 flex-shrink-0 flex flex-col items-center justify-center rounded-lg relative"
          style={{
            background: 'linear-gradient(180deg, #1a1a2e 0%, #0f1923 100%)',
            border: '2px solid #333',
          }}
        >
          <div
            className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full"
            style={{ background: '#333' }}
          />
          <Smartphone size={18} className="text-cyan-400 mb-1" />
          <span className="text-[7px] font-mono text-gray-500 text-center leading-tight">
            {device.galaxyModel.replace('Samsung ', '')}
          </span>
          <div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full flex items-center justify-center"
            style={{
              background: device.status === 'online' ? 'var(--color-safe)' : device.status === 'warning' ? 'var(--color-caution)' : 'var(--color-danger)',
              border: '1px solid #000',
            }}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-bold font-heading text-white">{device.id}</h4>
            <StatusBadge status={device.status} size="sm" />
          </div>
          <p className="text-xs text-gray-400 mb-3">{device.name}</p>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="flex items-center gap-1.5 text-gray-400">
              <Battery size={12} style={{ color: batteryColor }} />
              <span style={{ color: batteryColor }}>{device.battery}%</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <MapPin size={12} />
              GPS {device.gpsActive ? 'Aktif' : 'Mati'}
            </div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <Camera size={12} style={{ color: device.cameraStatus === 'online' ? 'var(--color-safe)' : 'var(--color-danger)' }} />
              Kamera {device.cameraStatus === 'online' ? 'Online' : 'Offline'}
            </div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <Wifi size={12} style={{ color: device.sensorStatus === 'online' ? 'var(--color-safe)' : 'var(--color-danger)' }} />
              Sensor {device.sensorStatus === 'online' ? 'Online' : 'Offline'}
            </div>
          </div>

          <div className="flex items-center gap-1 mt-2 text-[10px] text-gray-500">
            <Clock size={10} />
            Update: {new Date(device.lastUpdate).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
}
