// ============================================================
// AQUA EYE — Dashboard
// ============================================================

import { useNavigate } from 'react-router-dom';
import { useScenario } from '../context/ScenarioContext';
import { useAlerts } from '../context/AlertContext';
import { mockDevices } from '../data/devices';
import PageContainer from '../components/layout/PageContainer';
import RiskCard from '../components/cards/RiskCard';
import MetricCard from '../components/cards/MetricCard';
import SensorCard from '../components/cards/SensorCard';
import AIInsightCard from '../components/cards/AIInsightCard';
import ScenarioSwitcher from '../components/ui/ScenarioSwitcher';
import StatusBadge from '../components/ui/StatusBadge';
import {
  Droplets, Thermometer, FlaskConical, Ruler,
  AlertTriangle, Cpu, Monitor, ShieldAlert,
  ArrowRight, Waves,
} from 'lucide-react';

export default function Dashboard() {
  const { scenario } = useScenario();
  const { activeAlertCount } = useAlerts();
  const navigate = useNavigate();
  const onlineDevices = mockDevices.filter(d => d.status === 'online').length;

  return (
    <PageContainer
      title="Dashboard"
      subtitle="Pusat komando pemantauan keselamatan sungai"
      actions={<ScenarioSwitcher />}
    >
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-5">
        {/* ============================================
            LEFT COLUMN: AQUA SAFE INDEX (main focus)
            ============================================ */}
        <div className="xl:col-span-4 space-y-4">
          {/* AQUA SAFE INDEX - Dominant */}
          <div
            className="brutal-card p-6 flex flex-col items-center"
            style={{
              background: 'var(--color-surface-2)',
              border: `3px solid ${
                scenario.assessment.risk === 'danger' ? 'var(--color-danger)' :
                scenario.assessment.risk === 'caution' ? 'var(--color-caution)' :
                'var(--color-safe)'
              }`,
              boxShadow: `6px 6px 0px ${
                scenario.assessment.risk === 'danger' ? 'var(--color-danger)' :
                scenario.assessment.risk === 'caution' ? 'var(--color-caution)' :
                'var(--color-safe)'
              }`,
            }}
          >
            <div className="text-[10px] font-mono text-gray-400 tracking-[0.3em] mb-4 uppercase">
              AQUA SAFE INDEX
            </div>
            <RiskCard score={scenario.assessment.score} risk={scenario.assessment.risk} />
            <p className="text-xs text-gray-400 text-center mt-4 max-w-[260px]">
              {scenario.assessment.risk === 'safe' && 'Kondisi aman untuk operasi pembersihan sungai.'}
              {scenario.assessment.risk === 'caution' && 'Kondisi membutuhkan kewaspadaan ekstra sebelum operasi.'}
              {scenario.assessment.risk === 'danger' && 'BAHAYA — Personel dilarang memasuki area tanpa evaluasi.'}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/live-monitoring')}
              className="brutal-btn brutal-btn-primary px-3 py-3 flex flex-col items-center gap-1.5 text-xs"
            >
              <Monitor size={20} />
              Live Monitoring
            </button>
            <button
              onClick={() => navigate('/live-monitoring?emergency=true')}
              className="brutal-btn brutal-btn-danger px-3 py-3 flex flex-col items-center gap-1.5 text-xs"
            >
              <ShieldAlert size={20} />
              Emergency Assist
            </button>
          </div>
        </div>

        {/* ============================================
            CENTER COLUMN: Metrics + Sensors
            ============================================ */}
        <div className="xl:col-span-4 space-y-4">
          {/* Summary Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <MetricCard
              label="Peringatan Aktif"
              value={`0${activeAlertCount}`}
              subtitle="alert"
              icon={<AlertTriangle size={18} />}
              color="var(--color-caution)"
              borderColor="var(--color-caution)"
            />
            <MetricCard
              label="Perangkat Online"
              value={`${onlineDevices}/${mockDevices.length}`}
              subtitle="aktif"
              icon={<Cpu size={18} />}
              color="var(--color-safe)"
              borderColor="var(--color-safe)"
            />
          </div>

          {/* Sensor Cards */}
          <div className="grid grid-cols-2 gap-3">
            <SensorCard
              label="Turbidity"
              value={scenario.sensorData.turbidity}
              unit="NTU"
              param="turbidity"
              icon={<Waves size={16} />}
            />
            <SensorCard
              label="pH"
              value={scenario.sensorData.ph}
              unit=""
              param="ph"
              icon={<FlaskConical size={16} />}
            />
            <SensorCard
              label="Temperature"
              value={scenario.sensorData.temperature}
              unit="°C"
              param="temperature"
              icon={<Thermometer size={16} />}
            />
            <SensorCard
              label="TDS"
              value={scenario.sensorData.tds}
              unit="ppm"
              param="tds"
              icon={<Droplets size={16} />}
            />
          </div>

          {/* Depth Card - full width */}
          <SensorCard
            label="Kedalaman Air"
            value={scenario.sensorData.depth}
            unit="m"
            param="depth"
            icon={<Ruler size={16} />}
          />
        </div>

        {/* ============================================
            RIGHT COLUMN: AI Insights
            ============================================ */}
        <div className="xl:col-span-4 space-y-4">
          <AIInsightCard assessment={scenario.assessment} />
        </div>
      </div>

      {/* ============================================
          BOTTOM ROW: Recent Alerts + Devices
          ============================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
        {/* Recent Alerts */}
        <div
          className="brutal-card p-4"
          style={{
            background: 'var(--color-surface-2)',
            border: '3px solid #000',
            boxShadow: '5px 5px 0px #000',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-yellow-500" />
              <span className="text-sm font-bold font-heading text-white">Peringatan Terbaru</span>
            </div>
            <button
              onClick={() => navigate('/alert-center')}
              className="text-xs text-cyan-400 hover:text-white flex items-center gap-1 font-bold"
            >
              Lihat Semua <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-2">
            {[
              { severity: 'danger' as const, title: 'Objek Berbahaya Terdeteksi', time: '14:32', device: 'AUV-03' },
              { severity: 'caution' as const, title: 'Turbidity Melebihi Batas', time: '13:45', device: 'AUV-01' },
              { severity: 'emergency' as const, title: 'Manusia Terdeteksi', time: '15:10', device: 'AUV-02' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2 cursor-pointer hover:translate-x-1 transition-transform"
                style={{
                  background: 'var(--color-surface-3)',
                  borderLeft: `4px solid ${
                    item.severity === 'emergency' ? 'var(--color-emergency)' :
                    item.severity === 'danger' ? 'var(--color-danger)' :
                    'var(--color-caution)'
                  }`,
                }}
                onClick={() => navigate('/alert-center')}
              >
                <StatusBadge status={item.severity} size="sm" />
                <span className="text-xs text-gray-300 flex-1 truncate">{item.title}</span>
                <span className="text-[10px] font-mono text-gray-500">{item.time}</span>
                <span className="text-[10px] font-mono text-gray-600">{item.device}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Device Status */}
        <div
          className="brutal-card p-4"
          style={{
            background: 'var(--color-surface-2)',
            border: '3px solid #000',
            boxShadow: '5px 5px 0px #000',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Cpu size={16} className="text-cyan-400" />
              <span className="text-sm font-bold font-heading text-white">Status Perangkat</span>
            </div>
            <button
              onClick={() => navigate('/perangkat')}
              className="text-xs text-cyan-400 hover:text-white flex items-center gap-1 font-bold"
            >
              Kelola <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-2">
            {mockDevices.map((dev) => (
              <div
                key={dev.id}
                className="flex items-center gap-3 p-2 cursor-pointer hover:translate-x-1 transition-transform"
                style={{ background: 'var(--color-surface-3)' }}
                onClick={() => navigate('/perangkat')}
              >
                <StatusBadge status={dev.status} size="sm" />
                <span className="text-xs font-bold text-white">{dev.id}</span>
                <span className="text-xs text-gray-400 flex-1 truncate">{dev.name}</span>
                <span className="text-[10px] font-mono" style={{
                  color: dev.battery > 50 ? 'var(--color-safe)' : dev.battery > 20 ? 'var(--color-caution)' : 'var(--color-danger)'
                }}>
                  {dev.battery}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
