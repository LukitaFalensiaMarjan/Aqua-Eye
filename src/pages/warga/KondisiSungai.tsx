// ============================================================
// AQUA EYE — Warga Kondisi Sungai
// ============================================================

import { useEffect } from 'react';
import { useScenario } from '../../context/ScenarioContext';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Info, MapPin } from 'lucide-react';
import { monitoringPoints } from '../../data/mapPoints';
import type { MonitoringPoint } from '../../types';

export default function WargaKondisiSungai() {
  const { scenario } = useScenario();

  // Fix Leaflet default icon path issues
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  const risk = scenario.assessment.risk;
  const isDanger = risk === 'danger';
  const isCaution = risk === 'caution';

  const riskColor = isDanger ? 'var(--color-danger)' : isCaution ? 'var(--color-caution)' : 'var(--color-safe)';
  const riskLabel = isDanger ? 'BERBAHAYA' : isCaution ? 'WASPADA' : 'AMAN';

  const createIcon = (type: string) => {
    const color = type === 'hazard' ? '#ff3333' : '#00D4FF';
    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: ${color}; width: 16px; height: 16px; border: 2px solid #000; border-radius: 50%; box-shadow: 2px 2px 0 #000;"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-60px)] md:h-screen animate-fade-in">
      {/* Header Panel */}
      <div className="bg-[var(--color-surface-1)] border-b-4 border-black p-4 z-10 shadow-[0_4px_0_0_#000]">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 max-w-5xl mx-auto">
          <div>
            <h1 className="font-heading font-black text-xl text-white flex items-center gap-2">
              <MapPin size={20} className="text-cyan-400" />
              Sungai Cikapundung
            </h1>
            <p className="text-xs text-gray-400 mt-1">Pemantauan Publik AQUA EYE</p>
          </div>

          <div 
            className="border-2 border-black p-3 flex items-center gap-4 max-w-sm"
            style={{ background: riskColor }}
          >
            <div>
              <div className="text-[10px] font-bold text-black opacity-70">AQUA SAFE INDEX</div>
              <div className="font-heading font-black text-3xl text-black leading-none">
                {scenario.assessment.score}
              </div>
            </div>
            <div className="border-l-2 border-black pl-4">
              <div className="font-heading font-black text-xl text-black uppercase tracking-wider">{riskLabel}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative z-0">
        <MapContainer
          center={[-6.9148, 107.6098]}
          zoom={14}
          className="h-full w-full"
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          
          {/* Main Risk Area Circle (simulated) */}
          {isDanger && (
            <Circle 
              center={[-6.9148, 107.6098]} 
              radius={800}
              pathOptions={{ 
                color: '#ff3333',
                fillColor: '#ff3333',
                fillOpacity: 0.2,
                weight: 2,
                dashArray: '5, 10'
              }}
            />
          )}

          {monitoringPoints.filter((p: MonitoringPoint) => p.type !== 'emergency').map((point: MonitoringPoint) => (
            <Marker
              key={point.id}
              position={[point.coordinates.lat, point.coordinates.lng]}
              icon={createIcon(point.type)}
            >
              <Popup className="brutal-popup">
                <div className="p-1">
                  <div className="font-bold text-sm mb-1">{point.name}</div>
                  <div className="text-xs text-gray-600 mb-2">{point.description}</div>
                  <div className="text-[10px] bg-gray-100 p-1 font-mono">
                    Update: {new Date(point.lastUpdate).toLocaleTimeString()}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Floating Recommendation Overlay */}
        <div className="absolute bottom-24 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-80 z-[1000]">
          <div className="bg-[var(--color-surface-1)] border-4 border-black p-4 shadow-[6px_6px_0_0_#000]">
            <h3 className="font-bold text-white text-sm flex items-center gap-2 mb-2">
              <Info size={16} className="text-cyan-400" />
              Rekomendasi Keselamatan
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              {isDanger 
                ? "BAHAYA: Ketinggian air atau arus sangat berisiko. Dilarang mendekati bantaran sungai dan evakuasi jika berada di area rawan." 
                : isCaution 
                ? "WASPADA: Terdapat indikasi pencemaran atau peningkatan debit air. Hindari aktivitas di dalam air."
                : "Aman untuk aktivitas normal di sekitar sungai. Tetap waspada terhadap perubahan cuaca."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
