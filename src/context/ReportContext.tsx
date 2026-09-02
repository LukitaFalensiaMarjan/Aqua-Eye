// ============================================================
// AQUA EYE — Report Context (Shared State)
// ============================================================

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { CitizenReport, ReportStatus } from '../types';
import { mockCitizenReports } from '../data/mockCitizenReports';

interface ReportContextType {
  reports: CitizenReport[];
  addReport: (report: Omit<CitizenReport, 'id' | 'timestamp' | 'status'>) => void;
  updateReportStatus: (id: string, status: ReportStatus) => void;
}

const ReportContext = createContext<ReportContextType | null>(null);

export function ReportProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<CitizenReport[]>(() => {
    // Load from localStorage if available to persist across roles
    const saved = localStorage.getItem('aquaeye_reports');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse reports from localStorage', e);
      }
    }
    return mockCitizenReports;
  });

  useEffect(() => {
    localStorage.setItem('aquaeye_reports', JSON.stringify(reports));
  }, [reports]);

  const addReport = (reportData: Omit<CitizenReport, 'id' | 'timestamp' | 'status'>) => {
    const newReport: CitizenReport = {
      ...reportData,
      id: `WR-0${reports.length + 25}`, // mock ID generator
      timestamp: new Date().toISOString(),
      status: 'new',
    };
    setReports(prev => [newReport, ...prev]);
  };

  const updateReportStatus = (id: string, status: ReportStatus) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <ReportContext.Provider value={{ reports, addReport, updateReportStatus }}>
      {children}
    </ReportContext.Provider>
  );
}

export function useReports() {
  const ctx = useContext(ReportContext);
  if (!ctx) throw new Error('useReports must be used within ReportProvider');
  return ctx;
}
