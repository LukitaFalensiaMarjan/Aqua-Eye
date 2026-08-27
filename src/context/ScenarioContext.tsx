// ============================================================
// AQUA EYE — Scenario Context
// ============================================================

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ScenarioKey, Scenario } from '../types';
import { scenarios, defaultScenario } from '../data/scenarios';

interface ScenarioContextType {
  currentScenario: ScenarioKey;
  scenario: Scenario;
  setScenario: (key: ScenarioKey) => void;
}

const ScenarioContext = createContext<ScenarioContextType | null>(null);

export function ScenarioProvider({ children }: { children: ReactNode }) {
  const [currentScenario, setCurrentScenario] = useState<ScenarioKey>(defaultScenario);

  const value: ScenarioContextType = {
    currentScenario,
    scenario: scenarios[currentScenario],
    setScenario: setCurrentScenario,
  };

  return (
    <ScenarioContext.Provider value={value}>
      {children}
    </ScenarioContext.Provider>
  );
}

export function useScenario() {
  const ctx = useContext(ScenarioContext);
  if (!ctx) throw new Error('useScenario must be used within ScenarioProvider');
  return ctx;
}
