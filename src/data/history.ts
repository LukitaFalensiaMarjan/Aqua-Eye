// ============================================================
// AQUA EYE — Historical Data (7-Day Mock)
// ============================================================

import type { HistoryDataPoint } from '../types';

function generateHistoryData(): HistoryDataPoint[] {
  const data: HistoryDataPoint[] = [];
  const baseDate = new Date('2026-08-20T00:00:00+07:00');

  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour += 3) {
      const date = new Date(baseDate);
      date.setDate(date.getDate() + day);
      date.setHours(hour);

      const dayVariation = Math.sin((day * Math.PI) / 7) * 0.3;
      const hourVariation = Math.sin((hour * Math.PI) / 12) * 0.2;
      const variation = dayVariation + hourVariation;

      const ph = parseFloat((7.0 + variation * 0.8 - (day === 4 ? 0.8 : 0) + Math.cos(hour * 0.5) * 0.2).toFixed(1));
      const temperature = parseFloat((26.5 + hourVariation * 4 + day * 0.3).toFixed(1));
      const tds = Math.round(280 + variation * 300 + (day === 4 ? 200 : 0) + Math.sin(hour * 0.7) * 50);

      const phRisk = Math.min(100, (Math.abs(ph - 7.0) / 3) * 100);
      const tdsRisk = Math.min(100, (Math.max(0, tds) / 1000) * 100);
      const tempRisk = Math.min(100, (Math.abs(temperature - 25) / 15) * 100);

      const aquaSafeIndex = Math.round(
        phRisk * 0.30 + tdsRisk * 0.40 + tempRisk * 0.30
      );

      data.push({
        timestamp: date.toISOString(),
        date: `${date.getDate()}/${date.getMonth() + 1}`,
        ph: Math.max(5.0, Math.min(9.0, ph)),
        temperature: Math.max(20, Math.min(35, temperature)),
        tds: Math.max(100, Math.min(1000, tds)),
        aquaSafeIndex: Math.max(5, Math.min(95, aquaSafeIndex)),
      });
    }
  }

  return data;
}

export const historyData = generateHistoryData();

export const historySummary = {
  ph: {
    avg: 6.9,
    min: 5.8,
    max: 7.8,
  },
  temperature: {
    avg: 27.8,
    min: 25.2,
    max: 30.4,
  },
  tds: {
    avg: 410,
    min: 180,
    max: 920,
  },
  aquaSafeIndex: {
    avg: 45,
    min: 12,
    max: 82,
  },
  highestRiskPeriod: '23 Agustus 2026, 12:00 - 18:00',
  totalAlerts: 14,
};
