// ============================================================
// AQUA EYE — Warga Kondisi Sungai (Peta GIS Publik)
// ============================================================

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useScenario } from '../../context/ScenarioContext';
import { monitoringPoints, mapCenter, mapZoom } from '../../data/mapPoints';
import type { MonitoringPoint } from '../../types';
import StatusBadge from '../../components/ui/StatusBadge';
import { MapPin, Clock, Navigation, Cpu, Eye, ExternalLink, Info } from 'lucide-react';


// ─── Custom marker icons (sama seperti operator) ─────────────
function createIcon(color: string) {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 24px; height: 24px;
      background: ${color};
      border: 3px solid #000;
      box-shadow: 3px 3px 0px #000;
      display: flex; align-items: center; justify-content: center;
    "><div style="width:8px;height:8px;background:white;border-radius:50%;"></div></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

const markerIcons: Record<string, L.DivIcon> = {
  safe: createIcon('#84CC16'),
  caution: createIcon('#FACC15'),
  danger: createIcon('#EF4444'),
  emergency: createIcon('#FF0040'),
};

// ─── FlyTo Helper ─────────────────────────────────────────────
function FlyToPoint({ point }: { point: MonitoringPoint | null }) {
  const map = useMap();
  if (point) {
    map.flyTo([point.coordinates.lat, point.coordinates.lng], 16, { duration: 1 });
  }
  return null;
}

// ─── Main Component ───────────────────────────────────────────
export default function WargaKondisiSungai() {
  const { scenario } = useScenario();
  const [selectedPoint, setSelectedPoint] = useState<MonitoringPoint | null>(null);
  const [flyTarget, setFlyTarget] = useState<MonitoringPoint | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const risk = scenario.assessment.risk;
  const isDanger = risk === 'danger';
  const isCaution = risk === 'caution';
  const riskColor = isDanger ? 'var(--color-danger)' : isCaution ? 'var(--color-caution)' : 'var(--color-safe)';
  const riskLabel = isDanger ? 'BERBAHAYA' : isCaution ? 'WASPADA' : 'AMAN';

  const filteredPoints = filter === 'all'
    ? monitoringPoints
    : monitoringPoints.filter(p => p.status === filter);

  const navigateToPoint = (point: MonitoringPoint) => {
    setFlyTarget(point);
    setTimeout(() => setFlyTarget(null), 100);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-60px)] md:h-screen animate-fade-in">
      {/* ── Header AQUA SAFE INDEX (khas warga) ── */}
      <div className="bg-[var(--color-surface-1)] border-b-4 border-black p-4 z-10 shadow-[0_4px_0_0_#000] flex-shrink-0">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 max-w-7xl mx-auto">
          <div>
            <h1 className="font-heading font-black text-xl text-white flex items-center gap-2">
              <MapPin size={20} className="text-cyan-400" />
              Peta Kondisi Sungai
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">Pemantauan Publik AQUA EYE — Sungai Cikapundung</p>
          </div>

          {/* AQUA SAFE INDEX badge */}
          <div
            className="border-2 border-black px-4 py-2 flex items-center gap-4 flex-shrink-0"
            style={{ background: riskColor }}
          >
            <div>
              <div className="text-[9px] font-bold text-black opacity-70">AQUA SAFE INDEX</div>
              <div className="font-heading font-black text-2xl text-black leading-none">
                {scenario.assessment.score}
              </div>
            </div>
            <div className="border-l-2 border-black pl-4">
              <div className="font-heading font-black text-lg text-black uppercase tracking-wider">{riskLabel}</div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-1 flex-wrap">
            {['all', 'safe', 'caution', 'danger', 'emergency'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-2.5 py-1 text-[10px] font-bold font-heading uppercase tracking-wider transition-all"
                style={filter === f ? {
                  background: f === 'all' ? 'var(--color-aqua-blue)' : f === 'safe' ? 'var(--color-safe)' : f === 'caution' ? 'var(--color-caution)' : f === 'danger' ? 'var(--color-danger)' : 'var(--color-emergency)',
                  color: (f === 'safe' || f === 'caution') ? '#000' : '#fff',
                  border: '2px solid #000',
                  boxShadow: '2px 2px 0px #000',
                } : {
                  background: 'var(--color-surface-3)',
                  color: '#94a3b8',
                  border: '2px solid #1E3048',
                }}
              >
                {f === 'all' ? 'Semua' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-1 xl:grid-cols-12 h-full gap-0">

          {/* Map */}
          <div className="xl:col-span-8 relative" style={{ minHeight: '400px' }}>
            <MapContainer
              center={[mapCenter.lat, mapCenter.lng]}
              zoom={mapZoom}
              style={{ height: '100%', width: '100%', minHeight: '400px' }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <FlyToPoint point={flyTarget} />
              {filteredPoints.map((point) => (
                <Marker
                  key={point.id}
                  position={[point.coordinates.lat, point.coordinates.lng]}
                  icon={markerIcons[point.status] || markerIcons.safe}
                  eventHandlers={{
                    click: () => setSelectedPoint(point),
                  }}
                >
                  <Popup>
                    <div className="min-w-[180px] text-sm">
                      <div className="font-bold text-base mb-1" style={{ color: '#000' }}>{point.name}</div>
                      <div className="text-gray-600 mb-2 text-xs">{point.description}</div>
                      <div className="text-xs text-gray-500">
                        {point.coordinates.lat.toFixed(4)}, {point.coordinates.lng.toFixed(4)}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Floating Rekomendasi */}
            <div className="absolute bottom-4 left-4 w-72 z-[1000]">
              <div className="bg-[var(--color-surface-1)] border-4 border-black p-3 shadow-[6px_6px_0_0_#000]">
                <h3 className="font-bold text-white text-xs flex items-center gap-2 mb-2">
                  <Info size={14} className="text-cyan-400" />
                  Rekomendasi Keselamatan
                </h3>
                <p className="text-[11px] text-gray-300 leading-relaxed">
                  {isDanger
                    ? 'BAHAYA: Jauhi bantaran sungai, evakuasi jika di area rawan.'
                    : isCaution
                    ? 'WASPADA: Ada indikasi pencemaran. Hindari aktivitas di dalam air.'
                    : 'Aman untuk aktivitas normal. Tetap waspada terhadap perubahan cuaca.'}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar — Daftar Titik Pemantauan */}
          <div
            className="xl:col-span-4 flex flex-col overflow-hidden"
            style={{ background: 'var(--color-surface-1)', borderLeft: '3px solid #000' }}
          >
            <div className="p-4 border-b-2 border-[#1E3048]">
              <div className="text-xs font-mono text-gray-400 tracking-wider">
                {filteredPoints.length} TITIK PEMANTAUAN
              </div>
            </div>

            {/* Point List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {filteredPoints.map((point) => (
                <div
                  key={point.id}
                  className={`p-3 cursor-pointer transition-all hover:-translate-y-0.5 ${selectedPoint?.id === point.id ? 'ring-2 ring-cyan-400' : ''}`}
                  style={{
                    background: 'var(--color-surface-2)',
                    border: '3px solid #000',
                    boxShadow: '4px 4px 0px #000',
                  }}
                  onClick={() => {
                    setSelectedPoint(point);
                    navigateToPoint(point);
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-xs font-bold text-white font-heading leading-tight flex-1 pr-2">
                      {point.name}
                    </h4>
                    <StatusBadge status={point.status} size="sm" />
                  </div>
                  <p className="text-[11px] text-gray-400 mb-2 line-clamp-2">{point.description}</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin size={10} /> {point.coordinates.lat.toFixed(4)}, {point.coordinates.lng.toFixed(4)}
                    </span>
                    {point.deviceId && (
                      <span className="flex items-center gap-1">
                        <Cpu size={10} /> {point.deviceId}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock size={10} /> {new Date(point.lastUpdate).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); navigateToPoint(point); }}
                    className="mt-2 flex items-center gap-1 text-[10px] text-cyan-400 font-bold hover:text-white transition-colors"
                  >
                    <Navigation size={10} /> Navigasi ke Lokasi
                  </button>
                </div>
              ))}
            </div>

            {/* Selected Point Detail */}
            {selectedPoint && (
              <div
                className="m-3 p-4 animate-slide-in-up flex-shrink-0"
                style={{
                  background: 'var(--color-surface-2)',
                  border: '3px solid var(--color-aqua-cyan)',
                  boxShadow: '5px 5px 0px var(--color-aqua-cyan)',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Eye size={14} className="text-cyan-400" />
                  <span className="text-xs font-bold font-heading text-cyan-400 uppercase tracking-wider">
                    Detail Titik
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{selectedPoint.name}</h4>
                <p className="text-xs text-gray-400 mb-3">{selectedPoint.description}</p>
                <div className="space-y-1.5 text-[11px] text-gray-400">
                  <div>Tipe: <span className="text-white font-bold">{selectedPoint.type.toUpperCase()}</span></div>
                  <div>Status: <StatusBadge status={selectedPoint.status} size="sm" /></div>
                  <div>Koordinat: <span className="text-white font-mono">{selectedPoint.coordinates.lat.toFixed(4)}, {selectedPoint.coordinates.lng.toFixed(4)}</span></div>
                  {selectedPoint.deviceId && <div>Sensor: <span className="text-white">{selectedPoint.deviceId}</span></div>}
                  <div>Update: <span className="text-white">{new Date(selectedPoint.lastUpdate).toLocaleString('id-ID')}</span></div>
                </div>
                <button
                  className="w-full mt-3 py-2 text-xs flex items-center justify-center gap-2 font-bold transition-all"
                  style={{ background: 'var(--color-aqua-blue)', color: '#fff', border: '3px solid #000', boxShadow: '3px 3px 0 #000' }}
                  onClick={() => window.open(`https://www.google.com/maps?q=${selectedPoint.coordinates.lat},${selectedPoint.coordinates.lng}`, '_blank')}
                >
                  <ExternalLink size={12} /> Buka di Google Maps
                </button>
              </div>
            )}

            {/* SIMULASI label */}
            <div className="p-3 text-center border-t-2 border-[#1E3048] flex-shrink-0">
              <span className="text-[9px] font-mono tracking-widest text-gray-500">
                DATA LOKASI SIMULASI — TIDAK MEWAKILI KONDISI AKTUAL
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
