// ============================================================
// AQUA EYE — Type Definitions
// ============================================================

export type RiskLevel = 'safe' | 'caution' | 'danger';
export type AlertSeverity = RiskLevel | 'emergency';
export type AlertStatus = 'active' | 'verified' | 'resolved';
export type AlertCategory = 'air_quality' | 'visual_hazard' | 'human_detection' | 'device_warning' | 'emergency';
export type ScenarioKey = 'safe' | 'caution' | 'danger';
export type DeviceStatus = 'online' | 'offline' | 'warning';
export type ReportStatus = 'new' | 'verification' | 'in_progress' | 'resolved';

export interface WaterSensorData {
  turbidity: number;       // NTU
  ph: number;
  temperature: number;     // °C
  tds: number;             // ppm
  depth: number;           // meters
}

export interface SensorReading extends WaterSensorData {
  timestamp: string;
  deviceId: string;
}

export interface VisualHazard {
  level: 'low' | 'medium' | 'high';
  score: number; // 0-100
  description: string;
}

export interface AIVisionDetection {
  id: string;
  label: string;
  labelIndonesian: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
  priority: 'low' | 'medium' | 'high';
}

export interface SafetyFactor {
  parameter: string;
  status: 'NORMAL' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  value: string;
  contribution: number;
}

export interface SafetyAssessment {
  score: number;           // 0-100 AQUA SAFE Index
  risk: RiskLevel;
  factors: SafetyFactor[];
  reasoning: string;
  recommendations: string[];
}

export interface Alert {
  id: string;
  severity: AlertSeverity;
  category: AlertCategory;
  title: string;
  description: string;
  location: string;
  coordinates: { lat: number; lng: number };
  timestamp: string;
  deviceId: string;
  status: AlertStatus;
  aiReason: string;
  confidence: number;
  evidence?: string;
}

export interface Device {
  id: string;
  name: string;
  type: 'AUV' | 'buoy' | 'station';
  status: DeviceStatus;
  battery: number;
  gpsActive: boolean;
  sensorStatus: 'online' | 'offline' | 'error';
  cameraStatus: 'online' | 'offline' | 'error';
  lastUpdate: string;
  location: string;
  coordinates: { lat: number; lng: number };
  firmwareVersion: string;
  galaxyModel: string;
}

export interface MonitoringPoint {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  type: 'device' | 'hazard' | 'emergency' | 'river_point';
  status: RiskLevel | 'emergency';
  deviceId?: string;
  description: string;
  lastUpdate: string;
}

export interface Scenario {
  key: ScenarioKey;
  label: string;
  sensorData: WaterSensorData;
  visualHazard: VisualHazard;
  detections: AIVisionDetection[];
  assessment: SafetyAssessment;
}

export interface HistoryDataPoint {
  timestamp: string;
  date: string;
  ph: number;
  turbidity: number;
  temperature: number;
  tds: number;
  depth: number;
  aquaSafeIndex: number;
}

export interface ReportConfig {
  type: string;
  dateRange: { start: string; end: string };
  location: string;
  deviceId: string;
}

export interface UserProfile {
  name: string;
  role: 'operator' | 'warga';
  roleLabel: string;
  area?: string;
  email: string;
  phone: string;
  joinDate: string;
  lastLogin: string;
}

export interface CitizenReport {
  id: string;
  category: string;
  description: string;
  location: string;
  coordinates: { lat: number; lng: number };
  status: ReportStatus;
  priority: 'low' | 'medium' | 'high' | 'critical';
  citizen: string;
  timestamp: string;
  photoUrl?: string;
  linkedAlertId?: string;
}

export interface EmergencyIncident {
  id: string;
  timestamp: string;
  detections: AIVisionDetection[];
  coordinates: { lat: number; lng: number };
  priority: 'high' | 'critical';
  status: 'active' | 'responding' | 'resolved';
  alertId?: string;
}
