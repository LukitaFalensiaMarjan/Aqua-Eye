// ============================================================
// AQUA EYE — Scenario Switcher
// ============================================================

import { useScenario } from '../../context/ScenarioContext';
import type { ScenarioKey } from '../../types';
import { Beaker } from 'lucide-react';

const options: { key: ScenarioKey; label: string; color: string }[] = [
  { key: 'safe', label: 'Safe', color: 'var(--color-safe)' },
  { key: 'caution', label: 'Caution', color: 'var(--color-caution)' },
  { key: 'danger', label: 'Danger', color: 'var(--color-danger)' },
];

export default function ScenarioSwitcher() {
  const { currentScenario, setScenario } = useScenario();

  return (
    <div
      className="brutal-card p-3"
      style={{
        background: 'var(--color-surface-3)',
        border: '3px solid #000',
        boxShadow: '4px 4px 0px #000',
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Beaker size={14} className="text-cyan-400" />
        <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-widest uppercase">
          Mode Simulasi
        </span>
      </div>
      <div className="flex gap-1">
        {options.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setScenario(opt.key)}
            className="flex-1 px-2 py-1.5 text-xs font-bold font-heading uppercase tracking-wider transition-all duration-100"
            style={
              currentScenario === opt.key
                ? {
                    background: opt.color,
                    color: opt.key === 'danger' ? '#fff' : '#000',
                    border: '2px solid #000',
                    boxShadow: '3px 3px 0px #000',
                  }
                : {
                    background: 'var(--color-surface-1)',
                    color: '#94a3b8',
                    border: '2px solid #1E3048',
                  }
            }
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
