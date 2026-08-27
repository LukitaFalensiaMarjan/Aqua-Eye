// ============================================================
// AQUA EYE — Riwayat (History) Page
// ============================================================

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import PageContainer from '../components/layout/PageContainer';
import { historyData, historySummary } from '../data/history';
import { Calendar, BarChart3, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

type ParamKey = 'ph' | 'turbidity' | 'temperature' | 'tds' | 'depth' | 'aquaSafeIndex';

const paramConfig: Record<ParamKey, { label: string; color: string; unit: string }> = {
  aquaSafeIndex: { label: 'AQUA SAFE Index', color: '#0066FF', unit: '' },
  turbidity: { label: 'Turbidity', color: '#00D4FF', unit: 'NTU' },
  ph: { label: 'pH', color: '#84CC16', unit: '' },
  temperature: { label: 'Temperature', color: '#FACC15', unit: '°C' },
  tds: { label: 'TDS', color: '#EF4444', unit: 'ppm' },
  depth: { label: 'Kedalaman', color: '#A855F7', unit: 'm' },
};

export default function Riwayat() {
  const [selectedParam, setSelectedParam] = useState<ParamKey>('aquaSafeIndex');
  const [dateRange, setDateRange] = useState({ start: '2026-08-20', end: '2026-08-26' });

  const config = paramConfig[selectedParam];
  const summary = historySummary[selectedParam as keyof typeof historySummary];

  return (
    <PageContainer
      title="Riwayat"
      subtitle="Analisis historis data pemantauan sungai"
      actions={
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-gray-400" />
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="brutal-input px-2 py-1 text-xs"
            />
            <span className="text-gray-500">—</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="brutal-input px-2 py-1 text-xs"
            />
          </div>
        </div>
      }
    >
      {/* Parameter Filter */}
      <div className="flex gap-1.5 mb-5 flex-wrap">
        {(Object.keys(paramConfig) as ParamKey[]).map(key => (
          <button
            key={key}
            onClick={() => setSelectedParam(key)}
            className="px-3 py-1.5 text-[11px] font-bold font-heading uppercase tracking-wider transition-all"
            style={selectedParam === key ? {
              background: paramConfig[key].color,
              color: (key === 'ph' || key === 'temperature') ? '#000' : '#fff',
              border: '2px solid #000',
              boxShadow: '3px 3px 0px #000',
            } : {
              background: 'var(--color-surface-3)',
              color: '#94a3b8',
              border: '2px solid #1E3048',
            }}
          >
            {paramConfig[key].label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* Main Chart */}
        <div className="xl:col-span-9">
          <div
            className="brutal-card p-4"
            style={{
              background: 'var(--color-surface-2)',
              border: '3px solid #000',
              boxShadow: '6px 6px 0px #000',
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 size={16} style={{ color: config.color }} />
              <span className="text-sm font-bold font-heading text-white">
                Tren {config.label}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                ({dateRange.start} — {dateRange.end})
              </span>
            </div>
            <ResponsiveContainer width="100%" height={360}>
              <AreaChart data={historyData}>
                <defs>
                  <linearGradient id={`gradient-${selectedParam}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={config.color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={config.color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E3048" />
                <XAxis
                  dataKey="date"
                  stroke="#4a5568"
                  fontSize={10}
                  fontFamily="JetBrains Mono"
                />
                <YAxis
                  stroke="#4a5568"
                  fontSize={10}
                  fontFamily="JetBrains Mono"
                />
                <Tooltip
                  contentStyle={{
                    background: '#162236',
                    border: '2px solid #000',
                    boxShadow: '4px 4px 0px #000',
                    borderRadius: 0,
                    fontFamily: 'Inter',
                    fontSize: 12,
                  }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Area
                  type="monotone"
                  dataKey={selectedParam}
                  stroke={config.color}
                  strokeWidth={2}
                  fill={`url(#gradient-${selectedParam})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* All Parameters Chart */}
          <div
            className="brutal-card p-4 mt-4"
            style={{
              background: 'var(--color-surface-2)',
              border: '3px solid #000',
              boxShadow: '6px 6px 0px #000',
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-cyan-400" />
              <span className="text-sm font-bold font-heading text-white">
                Perbandingan Semua Parameter (Normalized)
              </span>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={historyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E3048" />
                <XAxis dataKey="date" stroke="#4a5568" fontSize={10} fontFamily="JetBrains Mono" />
                <YAxis stroke="#4a5568" fontSize={10} fontFamily="JetBrains Mono" />
                <Tooltip
                  contentStyle={{
                    background: '#162236',
                    border: '2px solid #000',
                    boxShadow: '4px 4px 0px #000',
                    borderRadius: 0,
                    fontSize: 11,
                  }}
                />
                <Line type="monotone" dataKey="ph" stroke="#84CC16" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="turbidity" stroke="#00D4FF" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="tds" stroke="#EF4444" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="aquaSafeIndex" stroke="#0066FF" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="xl:col-span-3 space-y-3">
          <div className="text-xs font-mono text-gray-400 tracking-wider mb-1 uppercase">
            Statistik {config.label}
          </div>

          {typeof summary === 'object' && 'avg' in summary && (
            <>
              {[
                { label: 'Rata-rata', value: summary.avg, icon: <BarChart3 size={14} />, color: config.color },
                { label: 'Minimum', value: summary.min, icon: <TrendingDown size={14} />, color: 'var(--color-safe)' },
                { label: 'Maksimum', value: summary.max, icon: <TrendingUp size={14} />, color: 'var(--color-danger)' },
              ].map(stat => (
                <div
                  key={stat.label}
                  className="brutal-card p-3"
                  style={{
                    background: 'var(--color-surface-2)',
                    border: '3px solid #000',
                    boxShadow: '4px 4px 0px #000',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div style={{ color: stat.color }}>{stat.icon}</div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-black font-heading text-white">
                    {stat.value} <span className="text-sm text-gray-500 font-mono">{config.unit}</span>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Risk Period */}
          <div
            className="brutal-card p-3"
            style={{
              background: 'var(--color-surface-2)',
              border: '3px solid var(--color-caution)',
              boxShadow: '4px 4px 0px var(--color-caution)',
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={14} className="text-yellow-500" />
              <span className="text-[10px] font-mono text-yellow-500 uppercase tracking-wider">
                Risiko Tertinggi
              </span>
            </div>
            <div className="text-xs text-white font-bold">{historySummary.highestRiskPeriod}</div>
          </div>

          {/* Alert Count */}
          <div
            className="brutal-card p-3"
            style={{
              background: 'var(--color-surface-2)',
              border: '3px solid var(--color-danger)',
              boxShadow: '4px 4px 0px var(--color-danger)',
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={14} className="text-red-400" />
              <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider">
                Total Alert
              </span>
            </div>
            <div className="text-2xl font-black font-heading text-white">{historySummary.totalAlerts}</div>
            <div className="text-[10px] text-gray-400">dalam 7 hari terakhir</div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
