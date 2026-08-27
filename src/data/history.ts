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

      const turbidity = Math.round(25 + variation * 80 + (day === 4 ? 60 : 0) + Math.sin(hour) * 10);
      const ph = parseFloat((7.0 + variation * 0.8 - (day === 4 ? 0.8 : 0) + Math.cos(hour * 0.5) * 0.2).toFixed(1));
      const temperature = parseFloat((26.5 + hourVariation * 4 + day * 0.3).toFixed(1));
      const tds = Math.round(280 + variation * 300 + (day === 4 ? 200 : 0) + Math.sin(hour * 0.7) * 50);
      const depth = parseFloat((1.0 + variation * 1.2 + (day === 3 || day === 4 ? 0.8 : 0) + Math.cos(hour * 0.3) * 0.2).toFixed(2));

      const turbRisk = Math.min(100, (Math.max(0, turbidity) / 200) * 100);
      const depthRisk = Math.min(100, (depth / 3) * 100);
      const phRisk = Math.min(100, (Math.abs(ph - 7.0) / 3) * 100);
      const tdsRisk = Math.min(100, (Math.max(0, tds) / 1000) * 100);
      const tempRisk = Math.min(100, (Math.abs(temperature - 25) / 15) * 100);
      const visualRisk = turbRisk * 0.5 + 15;

      const aquaSafeIndex = Math.round(
        turbRisk * 0.25 + depthRisk * 0.25 + phRisk * 0.15 + tdsRisk * 0.10 + tempRisk * 0.05 + visualRisk * 0.20
      );

      data.push({
        timestamp: date.toISOString(),
        date: `${date.getDate()}/${date.getMonth() + 1}`,
        ph: Math.max(5.0, Math.min(9.0, ph)),
        turbidity: Math.max(5, Math.min(200, turbidity)),
        temperature: Math.max(20, Math.min(35, temperature)),
        tds: Math.max(100, Math.min(1000, tds)),
        depth: Math.max(0.3, Math.min(3.0, depth)),
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
  turbidity: {
    avg: 52,
    min: 12,
    max: 156,
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
  depth: {
    avg: 1.45,
    min: 0.65,
    max: 2.65,
  },
  aquaSafeIndex: {
    avg: 45,
    min: 12,
    max: 82,
  },
  highestRiskPeriod: '23 Agustus 2026, 12:00 - 18:00',
  totalAlerts: 14,
};
