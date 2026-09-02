// ============================================================
// AQUA EYE — Main App (Router + Providers)
// ============================================================

import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ScenarioProvider } from './context/ScenarioContext';
import { AlertProvider } from './context/AlertContext';
import { ReportProvider } from './context/ReportContext';
import { ToastProvider } from './components/ui/Toast';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import WargaLayout from './components/layout/WargaLayout';

// Shared Pages
import Login from './pages/Login';

// Operator Pages
import Dashboard from './pages/Dashboard';
import LiveMonitoring from './pages/LiveMonitoring';
import PetaGIS from './pages/PetaGIS';
import Riwayat from './pages/Riwayat';
import AlertCenter from './pages/AlertCenter';
import ManajemenPerangkat from './pages/ManajemenPerangkat';
import Laporan from './pages/Laporan';
import Profil from './pages/Profil';

import LaporanWarga from './pages/LaporanWarga';

// Warga Pages
import WargaBeranda from './pages/warga/Beranda';
import WargaLapor from './pages/warga/Lapor';
import WargaLaporanSaya from './pages/warga/LaporanSaya';
import WargaKondisi from './pages/warga/KondisiSungai';
import WargaInfo from './pages/warga/InformasiKeselamatan';

function OperatorLayout() {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated || user?.role !== 'operator') return <Navigate to="/" replace />;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-[220px] flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function ProtectedWargaLayout() {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated || user?.role !== 'warga') return <Navigate to="/" replace />;
  return <WargaLayout />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
      {/* Operator Routes */}
      <Route path="/operator" element={<OperatorLayout />}>
        <Route index element={<Navigate to="/operator/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="live-monitoring" element={<LiveMonitoring />} />
        <Route path="peta-gis" element={<PetaGIS />} />
        <Route path="riwayat" element={<Riwayat />} />
        <Route path="alert-center" element={<AlertCenter />} />
        <Route path="laporan-warga" element={<LaporanWarga />} />
        <Route path="perangkat" element={<ManajemenPerangkat />} />
        <Route path="laporan" element={<Laporan />} />
        <Route path="profil" element={<Profil />} />
      </Route>

      {/* Warga Routes */}
      <Route path="/warga" element={<ProtectedWargaLayout />}>
        <Route index element={<Navigate to="/warga/beranda" replace />} />
        <Route path="beranda" element={<WargaBeranda />} />
        <Route path="lapor" element={<WargaLapor />} />
        <Route path="laporan-saya" element={<WargaLaporanSaya />} />
        <Route path="kondisi" element={<WargaKondisi />} />
        <Route path="info" element={<WargaInfo />} />
      </Route>

      {/* Legacy Fallbacks / Redirects */}
      <Route path="/dashboard" element={<Navigate to="/operator/dashboard" replace />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ReportProvider>
          <ScenarioProvider>
            <AlertProvider>
              <ToastProvider>
                <AppRoutes />
              </ToastProvider>
            </AlertProvider>
          </ScenarioProvider>
        </ReportProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
