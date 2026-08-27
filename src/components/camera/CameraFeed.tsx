// ============================================================
// AQUA EYE — Camera Feed Component
// ============================================================

import type { AIVisionDetection } from '../../types';

interface CameraFeedProps {
  detections: AIVisionDetection[];
  deviceId: string;
  location: string;
  isEmergency?: boolean;
  showScanLine?: boolean;
}

const priorityColors: Record<string, string> = {
  low: '#84CC16',
  medium: '#FACC15',
  high: '#EF4444',
};

export default function CameraFeed({
  detections,
  deviceId,
  location,
  isEmergency = false,
  showScanLine = true,
}: CameraFeedProps) {
  return (
    <div
      className="camera-container w-full aspect-video relative"
      style={{
        border: `3px solid ${isEmergency ? 'var(--color-emergency)' : '#000'}`,
        boxShadow: `6px 6px 0px ${isEmergency ? 'var(--color-emergency)' : '#000'}`,
        background: 'linear-gradient(180deg, #0a1520 0%, #050d14 50%, #0a1520 100%)',
      }}
    >
      {/* Simulated river scene background */}
      <div className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 70%, rgba(0, 60, 100, 0.3) 0%, transparent 60%),
            radial-gradient(ellipse at 30% 40%, rgba(0, 40, 80, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 50%, rgba(0, 50, 90, 0.15) 0%, transparent 50%),
            linear-gradient(180deg, #0a1a28 0%, #0d2030 30%, #081620 70%, #060e16 100%)
          `,
        }}
      />

      {/* Water ripple effect */}
      <div className="absolute inset-0 opacity-20"
        style={{
          background: `
            repeating-linear-gradient(0deg, transparent 0px, transparent 30px, rgba(0, 180, 255, 0.04) 30px, rgba(0, 180, 255, 0.04) 31px),
            repeating-linear-gradient(90deg, transparent 0px, transparent 50px, rgba(0, 180, 255, 0.02) 50px, rgba(0, 180, 255, 0.02) 51px)
          `,
        }}
      />

      {/* Camera grid */}
      <div className="camera-grid" />

      {/* Scan line */}
      {showScanLine && <div className="camera-scan-line" />}

      {/* Detection boxes */}
      {detections.map((det) => (
        <div key={det.id}>
          <div
            className="detection-box"
            style={{
              left: `${(det.x / 640) * 100}%`,
              top: `${(det.y / 480) * 100}%`,
              width: `${(det.width / 640) * 100}%`,
              height: `${(det.height / 480) * 100}%`,
              borderColor: priorityColors[det.priority],
              boxShadow: `0 0 8px ${priorityColors[det.priority]}40`,
            }}
          >
            {/* Corner brackets */}
            <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2" style={{ borderColor: priorityColors[det.priority] }} />
            <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2" style={{ borderColor: priorityColors[det.priority] }} />
            <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2" style={{ borderColor: priorityColors[det.priority] }} />
            <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2" style={{ borderColor: priorityColors[det.priority] }} />
          </div>
          {/* Label */}
          <div
            className="absolute text-[10px] font-bold font-mono px-1.5 py-0.5 whitespace-nowrap z-10"
            style={{
              left: `${(det.x / 640) * 100}%`,
              top: `calc(${(det.y / 480) * 100}% - 18px)`,
              background: priorityColors[det.priority],
              color: det.priority === 'high' ? '#fff' : '#000',
              border: '1px solid #000',
            }}
          >
            {det.labelIndonesian} — {Math.round(det.confidence * 100)}%
          </div>
        </div>
      ))}

      {/* Overlay UI */}
      {/* Top-left: LIVE + timestamp */}
      <div className="absolute top-3 left-3 flex items-center gap-2 z-20">
        <div
          className="flex items-center gap-1.5 px-2 py-1"
          style={{
            background: isEmergency ? 'var(--color-emergency)' : 'var(--color-danger)',
            border: '2px solid #000',
          }}
        >
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="text-[10px] font-bold font-mono text-white tracking-widest">
            {isEmergency ? 'EMERGENCY' : 'LIVE'}
          </span>
        </div>
        <span className="text-[10px] font-mono text-gray-400 bg-black/60 px-2 py-1 border border-gray-700">
          {new Date().toLocaleTimeString('id-ID')}
        </span>
      </div>

      {/* Top-right: Device info */}
      <div className="absolute top-3 right-3 text-right z-20">
        <div className="text-[10px] font-mono text-gray-400 bg-black/60 px-2 py-1 border border-gray-700">
          <div>{deviceId}</div>
          <div>{location}</div>
        </div>
      </div>

      {/* Bottom-left: AI status */}
      <div className="absolute bottom-3 left-3 z-20">
        <div
          className="flex items-center gap-1.5 px-2 py-1"
          style={{
            background: 'rgba(0, 102, 255, 0.8)',
            border: '1px solid #000',
          }}
        >
          <span className="text-[10px] font-bold font-mono text-white tracking-wider">
            AI VISION ACTIVE • {detections.length} DETEKSI
          </span>
        </div>
      </div>

      {/* Bottom-right: Resolution */}
      <div className="absolute bottom-3 right-3 z-20">
        <span className="text-[9px] font-mono text-gray-500 bg-black/60 px-1.5 py-0.5">
          1920×1080 • 30fps
        </span>
      </div>
    </div>
  );
}
