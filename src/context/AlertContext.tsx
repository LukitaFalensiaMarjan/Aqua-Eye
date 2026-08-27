// ============================================================
// AQUA EYE — Alert Context
// ============================================================

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Alert, AlertStatus } from '../types';
import { mockAlerts } from '../data/alerts';

interface AlertContextType {
  alerts: Alert[];
  activeAlertCount: number;
  updateAlertStatus: (id: string, status: AlertStatus) => void;
  addAlert: (alert: Alert) => void;
  getAlert: (id: string) => Alert | undefined;
}

const AlertContext = createContext<AlertContextType | null>(null);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);

  const activeAlertCount = alerts.filter(a => a.status === 'active').length;

  const updateAlertStatus = (id: string, status: AlertStatus) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const addAlert = (alert: Alert) => {
    setAlerts(prev => [alert, ...prev]);
  };

  const getAlert = (id: string) => alerts.find(a => a.id === id);

  return (
    <AlertContext.Provider value={{ alerts, activeAlertCount, updateAlertStatus, addAlert, getAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlerts() {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlerts must be used within AlertProvider');
  return ctx;
}
