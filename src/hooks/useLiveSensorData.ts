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
    return {
      ph: base.ph,
      temperature: base.temperature,
      tds: base.tds,
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
