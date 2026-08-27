// ============================================================
// AQUA EYE — Main App (Router + Providers)
// ============================================================

import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ScenarioProvider } from './context/ScenarioContext';
import { AlertProvider } from './context/AlertContext';
import { ToastProvider } from './components/ui/Toast';
import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LiveMonitoring from './pages/LiveMonitoring';
import PetaGIS from './pages/PetaGIS';
import Riwayat from './pages/Riwayat';
import AlertCenter from './pages/AlertCenter';
import ManajemenPerangkat from './pages/ManajemenPerangkat';
import Laporan from './pages/Laporan';
import Profil from './pages/Profil';

function ProtectedLayout() {
  const { isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return (
    <ScenarioProvider>
      <AlertProvider>
        <div className="flex min-h-screen">
          <Sidebar 
            mobileOpen={mobileOpen} 
            onCloseMobile={() => setMobileOpen(false)} 
            desktopCollapsed={desktopCollapsed}
            setDesktopCollapsed={setDesktopCollapsed}
          />
          <div 
            className={`flex-1 flex flex-col min-h-screen transition-all duration-200 ${
              desktopCollapsed ? 'md:ml-[72px]' : 'md:ml-[220px]'
            }`}
          >
            <Header onMenuClick={() => setMobileOpen(true)} />
            <main className="flex-1 overflow-y-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </AlertProvider>
    </ScenarioProvider>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/live-monitoring" element={<LiveMonitoring />} />
        <Route path="/peta-gis" element={<PetaGIS />} />
        <Route path="/riwayat" element={<Riwayat />} />
        <Route path="/alert-center" element={<AlertCenter />} />
        <Route path="/perangkat" element={<ManajemenPerangkat />} />
        <Route path="/laporan" element={<Laporan />} />
        <Route path="/profil" element={<Profil />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </HashRouter>
  );
}
