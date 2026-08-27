// ============================================================
// AQUA EYE — Live Monitoring Page
// ============================================================

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useScenario } from '../context/ScenarioContext';
import { useAlerts } from '../context/AlertContext';
import PageContainer from '../components/layout/PageContainer';
import CameraFeed from '../components/camera/CameraFeed';
import SensorCard from '../components/cards/SensorCard';
import RiskCard from '../components/cards/RiskCard';
import AIInsightCard from '../components/cards/AIInsightCard';
import ScenarioSwitcher from '../components/ui/ScenarioSwitcher';
import StatusBadge from '../components/ui/StatusBadge';
import Modal from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';
import {
  Waves, FlaskConical, Thermometer, Droplets, Ruler,
  ShieldAlert, MapPin, Clock, Radio, AlertOctagon,
  CheckCircle, X,
} from 'lucide-react';
import type { AIVisionDetection } from '../types';

const emergencyDetections: AIVisionDetection[] = [
  {
    id: 'em-1', label: 'Human', labelIndonesian: 'MANUSIA',
    confidence: 0.96, x: 260, y: 140, width: 80, height: 140, priority: 'high',
  },
  {
    id: 'em-2', label: 'Floating Object', labelIndonesian: 'Objek Mengapung',
    confidence: 0.88, x: 450, y: 220, width: 90, height: 60, priority: 'high',
  },
];

export default function LiveMonitoring() {
  const [searchParams] = useSearchParams();
  const { scenario } = useScenario();
  const { addAlert } = useAlerts();
  const { addToast } = useToast();

  const [emergencyActive, setEmergencyActive] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [tab, setTab] = useState<'assessment' | 'emergency'>('assessment');
  const [emergencyCreated, setEmergencyCreated] = useState(false);

  useEffect(() => {
    if (searchParams.get('emergency') === 'true') {
      setShowConfirm(true);
    }
  }, [searchParams]);

  const activateEmergency = () => {
    setEmergencyActive(true);
    setShowConfirm(false);
    setTab('emergency');
    addToast('warning', 'EMERGENCY ASSIST DIAKTIFKAN — Mode darurat aktif');

    if (!emergencyCreated) {
      addAlert({
        id: `ALR-EM-${Date.now()}`,
        severity: 'emergency',
        category: 'emergency',
        title: 'Emergency Assist Diaktifkan',
        description: 'Mode darurat diaktifkan oleh operator. Deteksi manusia teridentifikasi di area sungai.',
        location: 'Pos Pemantauan Cikapundung Tengah',
        coordinates: { lat: -6.9148, lng: 107.6098 },
        timestamp: new Date().toISOString(),
        deviceId: 'AUV-01',
        status: 'active',
        aiReason: 'Operator mengaktifkan Emergency Assist. AI mendeteksi manusia dengan confidence 96%.',
        confidence: 0.96,
      });
      setEmergencyCreated(true);
    }
  };

  const deactivateEmergency = () => {
    setEmergencyActive(false);
    setTab('assessment');
    addToast('success', 'Emergency Assist dinonaktifkan');
  };

  const currentDetections = emergencyActive ? emergencyDetections : scenario.detections;

  return (
    <PageContainer
      title="Live Monitoring"
      subtitle={emergencyActive ? '⚠ EMERGENCY ASSIST ACTIVE' : 'Pemantauan real-time kondisi sungai'}
      actions={
        <div className="flex items-center gap-3">
          <ScenarioSwitcher />
          {!emergencyActive ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="brutal-btn brutal-btn-danger px-4 py-2 text-xs flex items-center gap-2"
            >
              <ShieldAlert size={16} />
              AKTIFKAN EMERGENCY
            </button>
          ) : (
            <button
              onClick={deactivateEmergency}
              className="brutal-btn px-4 py-2 text-xs flex items-center gap-2"
              style={{ background: '#64748b', color: '#fff', border: '3px solid #000', boxShadow: '4px 4px 0px #000' }}
            >
              <X size={16} />
              NONAKTIFKAN
            </button>
          )}
        </div>
      }
    >
      {/* Emergency Banner */}
      {emergencyActive && (
        <div
          className="mb-4 px-4 py-3 flex items-center gap-3 animate-slide-in-up"
          style={{
            background: 'var(--color-emergency)',
            border: '3px solid #000',
            boxShadow: '6px 6px 0px #000',
          }}
        >
          <AlertOctagon size={24} className="text-white animate-pulse" />
          <div>
            <div className="text-sm font-black font-heading text-white tracking-wider">
              EMERGENCY ASSIST ACTIVE
            </div>
            <div className="text-xs text-white/80">
              Mode darurat aktif — Deteksi prioritas tinggi sedang berjalan
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-5">
        {/* ============================================
            LEFT: Camera Feed
            ============================================ */}
        <div className="xl:col-span-8 space-y-4">
          <CameraFeed
            detections={currentDetections}
            deviceId="AUV-01"
            location="Cikapundung Tengah"
            isEmergency={emergencyActive}
          />

          {/* Sensor Panel */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <SensorCard label="Turbidity" value={scenario.sensorData.turbidity} unit="NTU" param="turbidity" icon={<Waves size={14} />} />
            <SensorCard label="pH" value={scenario.sensorData.ph} unit="" param="ph" icon={<FlaskConical size={14} />} />
            <SensorCard label="Temperature" value={scenario.sensorData.temperature} unit="°C" param="temperature" icon={<Thermometer size={14} />} />
            <SensorCard label="TDS" value={scenario.sensorData.tds} unit="ppm" param="tds" icon={<Droplets size={14} />} />
            <SensorCard label="Kedalaman" value={scenario.sensorData.depth} unit="m" param="depth" icon={<Ruler size={14} />} />
          </div>
        </div>

        {/* ============================================
            RIGHT: Analysis Panel
            ============================================ */}
        <div className="xl:col-span-4 space-y-4">
          {/* Tabs */}
          <div className="flex gap-1">
            <button
              onClick={() => setTab('assessment')}
              className="flex-1 px-3 py-2 text-xs font-bold font-heading uppercase tracking-wider transition-all"
              style={tab === 'assessment' ? {
                background: 'var(--color-aqua-blue)',
                color: '#fff',
                border: '2px solid #000',
                boxShadow: '3px 3px 0px #000',
              } : {
                background: 'var(--color-surface-3)',
                color: '#94a3b8',
                border: '2px solid #1E3048',
              }}
            >
              AI Safety Assessment
            </button>
            <button
              onClick={() => setTab('emergency')}
              className="flex-1 px-3 py-2 text-xs font-bold font-heading uppercase tracking-wider transition-all"
              style={tab === 'emergency' ? {
                background: emergencyActive ? 'var(--color-emergency)' : 'var(--color-aqua-blue)',
                color: '#fff',
                border: '2px solid #000',
                boxShadow: '3px 3px 0px #000',
              } : {
                background: 'var(--color-surface-3)',
                color: '#94a3b8',
                border: '2px solid #1E3048',
              }}
            >
              Emergency Assist
            </button>
          </div>

          {/* Assessment Tab */}
          {tab === 'assessment' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex justify-center">
                <RiskCard score={scenario.assessment.score} risk={scenario.assessment.risk} />
              </div>
              <AIInsightCard assessment={scenario.assessment} />
            </div>
          )}

          {/* Emergency Tab */}
          {tab === 'emergency' && (
            <div className="space-y-3 animate-fade-in">
              {emergencyActive ? (
                <>
                  {/* Detection List */}
                  <div
                    className="brutal-card p-4"
                    style={{
                      background: 'var(--color-surface-2)',
                      border: '3px solid var(--color-emergency)',
                      boxShadow: '5px 5px 0px var(--color-emergency)',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Radio size={14} className="text-red-400 animate-pulse" />
                      <span className="text-xs font-bold font-heading text-red-400 uppercase tracking-wider">
                        Deteksi Aktif
                      </span>
                    </div>
                    {emergencyDetections.map((det) => (
                      <div
                        key={det.id}
                        className="p-3 mb-2"
                        style={{ background: 'var(--color-surface-3)', border: '2px solid #1E3048' }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-white font-heading">
                            {det.labelIndonesian}
                          </span>
                          <StatusBadge status="emergency" size="sm" />
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-400">
                          <div>Confidence: <span className="text-white font-bold">{Math.round(det.confidence * 100)}%</span></div>
                          <div>Priority: <span className="text-red-400 font-bold">HIGH</span></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* GPS Location */}
                  <div
                    className="brutal-card p-4"
                    style={{
                      background: 'var(--color-surface-2)',
                      border: '3px solid #000',
                      boxShadow: '5px 5px 0px #000',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={14} className="text-cyan-400" />
                      <span className="text-xs font-bold font-heading text-cyan-400 uppercase tracking-wider">
                        Lokasi GPS
                      </span>
                    </div>
                    <div className="font-mono text-sm text-white mb-1">
                      -6.9148, 107.6098
                    </div>
                    <div className="text-xs text-gray-400">
                      Pos Pemantauan Cikapundung Tengah
                    </div>
                  </div>

                  {/* Incident Card */}
                  <div
                    className="brutal-card p-4"
                    style={{
                      background: 'var(--color-surface-2)',
                      border: '3px solid #000',
                      boxShadow: '5px 5px 0px #000',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={14} className="text-gray-400" />
                      <span className="text-xs font-bold font-heading text-gray-400 uppercase tracking-wider">
                        Insiden
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>Waktu: <span className="text-white">{new Date().toLocaleTimeString('id-ID')}</span></div>
                      <div>Device: <span className="text-white">AUV-01</span></div>
                      <div>Status: <span className="text-red-400 font-bold">MENUNGGU RESPONS</span></div>
                    </div>
                    <button
                      onClick={() => {
                        deactivateEmergency();
                        addToast('success', 'Insiden ditandai selesai');
                      }}
                      className="brutal-btn brutal-btn-safe w-full mt-3 py-2 text-xs flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={14} />
                      TANDAI SELESAI
                    </button>
                  </div>
                </>
              ) : (
                <div
                  className="brutal-card p-6 text-center"
                  style={{
                    background: 'var(--color-surface-2)',
                    border: '3px solid #1E3048',
                    boxShadow: '5px 5px 0px #1E3048',
                  }}
                >
                  <ShieldAlert size={40} className="text-gray-600 mx-auto mb-3" />
                  <div className="text-sm font-bold text-gray-400 mb-2">
                    Emergency Assist Tidak Aktif
                  </div>
                  <p className="text-xs text-gray-500 mb-4">
                    Aktifkan untuk memulai deteksi darurat dengan Computer Vision.
                  </p>
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="brutal-btn brutal-btn-danger px-4 py-2 text-xs"
                  >
                    AKTIFKAN EMERGENCY ASSIST
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Konfirmasi Emergency Assist"
      >
        <div className="text-center">
          <div
            className="w-16 h-16 mx-auto mb-4 flex items-center justify-center"
            style={{
              background: 'var(--color-emergency)',
              border: '3px solid #000',
              boxShadow: '4px 4px 0px #000',
            }}
          >
            <ShieldAlert size={32} className="text-white" />
          </div>
          <h4 className="text-lg font-bold text-white mb-2 font-heading">
            Aktifkan Emergency Assist?
          </h4>
          <p className="text-sm text-gray-400 mb-6">
            Mode darurat akan mengaktifkan deteksi prioritas tinggi termasuk deteksi manusia dan objek berbahaya. Alert akan dibuat secara otomatis.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowConfirm(false)}
              className="brutal-btn flex-1 py-2.5 text-sm"
              style={{ background: 'var(--color-surface-3)', color: '#94a3b8', border: '3px solid #000', boxShadow: '4px 4px 0px #000' }}
            >
              BATAL
            </button>
            <button
              onClick={activateEmergency}
              className="brutal-btn brutal-btn-emergency flex-1 py-2.5 text-sm"
            >
              AKTIFKAN
            </button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
}
