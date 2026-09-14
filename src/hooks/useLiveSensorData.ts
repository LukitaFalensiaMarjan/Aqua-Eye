// ============================================================
// AQUA EYE — Live Sensor Data Hook (Simulated Streaming)
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import type { WaterSensorData } from '../types';

interface LiveSensorData extends WaterSensorData {
  lastUpdated: Date;
  isLive: boolean;
}

/**
 * Simulates live sensor streaming by applying small random fluctuations
 * to the base scenario sensor values every 3 seconds.
 */
export function useLiveSensorData(base: WaterSensorData): LiveSensorData {
  const fluctuate = useCallback((): LiveSensorData => {
    const jitter = (range: number) => (Math.random() - 0.5) * 2 * range;
    return {
      ph: parseFloat(Math.max(4.0, Math.min(10.0, base.ph + jitter(0.08))).toFixed(2)),
      temperature: parseFloat(Math.max(15, Math.min(40, base.temperature + jitter(0.3))).toFixed(1)),
      tds: Math.round(Math.max(50, Math.min(1200, base.tds + jitter(12))),),
      lastUpdated: new Date(),
      isLive: true,
    };
  }, [base.ph, base.temperature, base.tds]);

  const [liveData, setLiveData] = useState<LiveSensorData>(fluctuate);

  // Reset immediately when base scenario changes
  useEffect(() => {
    setLiveData(fluctuate());
  }, [fluctuate]);

  // Stream updates every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(fluctuate());
    }, 3000);
    return () => clearInterval(interval);
  }, [fluctuate]);

  return liveData;
}
