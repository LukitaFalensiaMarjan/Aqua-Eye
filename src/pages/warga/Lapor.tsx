// ============================================================
// AQUA EYE — Warga Lapor Form
// ============================================================

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Camera, MapPin, Send, AlertTriangle } from 'lucide-react';
import { useReports } from '../../context/ReportContext';
import { useToast } from '../../components/ui/Toast';

export default function WargaLapor() {
  const navigate = useNavigate();
  const { addReport } = useReports();
  const { addToast } = useToast();

  const locationParams = useLocation();
  const isEmergency = new URLSearchParams(locationParams.search).get('emergency') === 'true';


  const [formData, setFormData] = useState({
    category: isEmergency ? 'Orang Dalam Bahaya' : '',
    location: '',
    description: '',
    photoPreview: null as string | null,
    priority: (isEmergency ? 'critical' : 'medium') as 'low' | 'medium' | 'high' | 'critical'
  });

  const categories = isEmergency 
    ? ['Orang Dalam Bahaya', 'Tenggelam', 'Banjir Bandang', 'Pohon Tumbang', 'Lainnya']
    : ['Sampah', 'Pencemaran Air', 'Air Berbahaya', 'Objek Berbahaya', 'Banjir', 'Lainnya'];
  const mockLocations = ['Sungai Cikapundung (Jembatan Pasupati)', 'Cikapundung Hulu', 'Cikapundung Hilir', 'Pos 4 Tamansari'];

  const handlePhotoSimulation = () => {
    // Simulate photo selection using a static placeholder to represent an uploaded image
    setFormData(prev => ({ 
      ...prev, 
      photoPreview: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiM0NDQiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNHB4IiBmaWxsPSIjYWFhIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U0lNVUxBVEVEIFBIT1RPPC90ZXh0Pjwvc3ZnPg==' 
    }));
  };

  const handleSubmit = () => {
    if (!formData.category || !formData.location || !formData.description) {
      addToast('error', 'Mohon lengkapi semua data laporan.');
      return;
    }

    addReport({
      category: formData.category,
      location: formData.location,
      description: formData.description,
      coordinates: { lat: -6.9148, lng: 107.6098 }, // Mock default coordinate
      priority: formData.priority,
      citizen: 'Warga Bandung (AQUA EYE App)',
      photoUrl: formData.photoPreview || undefined
    });

    addToast('success', 'Laporan berhasil dikirim. Menunggu verifikasi.');
    navigate('/warga/laporan-saya');
  };

  return (
    <div className="p-4 max-w-lg mx-auto pb-24">
      <div className={`mb-6 border-l-4 pl-3 ${isEmergency ? 'border-red-500' : 'border-cyan-400'}`}>
        <h1 className={`font-heading font-black text-2xl ${isEmergency ? 'text-red-500' : 'text-white'}`}>
          {isEmergency ? 'LAPORKAN DARURAT' : 'Laporkan Kondisi'}
        </h1>
        <p className="text-xs text-gray-400">
          {isEmergency ? 'Untuk keadaan yang mengancam nyawa' : 'Pusat Laporan Warga AQUA EYE'}
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Step 1: Kategori */}
        <div className="bg-[var(--color-surface-2)] border-2 border-black p-4 shadow-[4px_4px_0_0_#000]">
          <h2 className="font-bold text-white mb-3 text-sm flex items-center gap-2">
            <span className="bg-cyan-400 text-black w-5 h-5 flex items-center justify-center rounded-full text-xs">1</span>
            Pilih Jenis Laporan
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFormData(prev => ({ ...prev, category: cat }))}
                className={`p-2 text-xs font-bold border-2 border-black transition-all ${
                  formData.category === cat 
                  ? 'bg-cyan-400 text-black shadow-[2px_2px_0_0_#000]' 
                  : 'bg-[var(--color-surface-1)] text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Lokasi */}
        <div className="bg-[var(--color-surface-2)] border-2 border-black p-4 shadow-[4px_4px_0_0_#000]">
          <h2 className="font-bold text-white mb-3 text-sm flex items-center gap-2">
            <span className="bg-cyan-400 text-black w-5 h-5 flex items-center justify-center rounded-full text-xs">2</span>
            Lokasi Kejadian
          </h2>
          <div className="flex gap-2 mb-3">
            <select
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="brutal-input flex-1 text-sm bg-[var(--color-surface-1)]"
            >
              <option value="">Pilih Lokasi Terdekat</option>
              {mockLocations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          <div className="h-24 bg-[var(--color-surface-0)] border-2 border-dashed border-gray-600 flex items-center justify-center text-gray-500 text-xs">
            <MapPin size={16} className="mr-2" />
            (Simulasi Peta Interaktif)
          </div>
        </div>

        {/* Step 3: Foto */}
        <div className="bg-[var(--color-surface-2)] border-2 border-black p-4 shadow-[4px_4px_0_0_#000]">
          <h2 className="font-bold text-white mb-3 text-sm flex items-center gap-2">
            <span className="bg-cyan-400 text-black w-5 h-5 flex items-center justify-center rounded-full text-xs">3</span>
            Bukti Foto (Opsional)
          </h2>
          {formData.photoPreview ? (
            <div className="relative">
              <img src={formData.photoPreview} alt="Preview" className="w-full h-32 object-cover border-2 border-black" />
              <button 
                onClick={() => setFormData(prev => ({ ...prev, photoPreview: null }))}
                className="absolute top-2 right-2 bg-red-600 text-white border-2 border-black p-1 text-[10px] font-bold"
              >
                HAPUS
              </button>
            </div>
          ) : (
            <button 
              onClick={handlePhotoSimulation}
              className="w-full h-20 border-2 border-dashed border-gray-500 hover:border-cyan-400 text-gray-400 hover:text-cyan-400 flex flex-col items-center justify-center transition-colors bg-[var(--color-surface-1)]"
            >
              <Camera size={20} className="mb-1" />
              <span className="text-[10px] font-bold">Ambil Foto / Pilih dari Galeri</span>
            </button>
          )}
        </div>

        {/* Step 4: Deskripsi */}
        <div className="bg-[var(--color-surface-2)] border-2 border-black p-4 shadow-[4px_4px_0_0_#000]">
          <h2 className="font-bold text-white mb-3 text-sm flex items-center gap-2">
            <span className="bg-cyan-400 text-black w-5 h-5 flex items-center justify-center rounded-full text-xs">4</span>
            Deskripsi
          </h2>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Ceritakan kondisi yang Anda lihat..."
            className="brutal-input w-full min-h-[100px] text-sm bg-[var(--color-surface-1)] resize-none"
          />
        </div>

        {/* Emergency Note */}
        {isEmergency ? (
          <div className="bg-red-500/20 border-2 border-red-500 p-3 flex gap-3 items-start">
            <AlertTriangle size={20} className="text-red-500 shrink-0" />
            <p className="text-[10px] text-red-100">
              <strong>PERHATIAN DARURAT!</strong> Laporan ini akan segera diteruskan ke operator. Untuk penanganan medis segera, tetap hubungi <strong>112</strong> atau layanan gawat darurat setempat. AQUA EYE tidak menggantikan layanan darurat resmi.
            </p>
          </div>
        ) : (
          <div className="bg-yellow-400/10 border-2 border-yellow-400 p-3 flex gap-3 items-start">
            <AlertTriangle size={20} className="text-yellow-400 shrink-0" />
            <p className="text-[10px] text-yellow-100">
              <strong>Keadaan Darurat?</strong> Jika ada nyawa terancam atau bahaya ekstrem, prioritas laporan ini akan dinaikkan oleh operator atau silakan hubungi 112.
            </p>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!formData.category || !formData.location || !formData.description}
          className={`brutal-btn w-full py-4 text-sm flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
            isEmergency ? 'bg-red-600 hover:bg-red-700 text-white border-2 border-black font-bold shadow-[4px_4px_0_0_#000]' : 'brutal-btn-primary'
          }`}
        >
          <Send size={18} />
          {isEmergency ? 'KIRIM LAPORAN DARURAT' : 'KIRIM LAPORAN SEKARANG'}
        </button>
      </div>
    </div>
  );
}
