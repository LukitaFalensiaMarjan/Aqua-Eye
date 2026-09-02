// ============================================================
// AQUA EYE — Warga Informasi Keselamatan
// ============================================================

import { Droplets, AlertTriangle, LifeBuoy, Phone } from 'lucide-react';

export default function WargaInformasiKeselamatan() {
  const cards = [
    {
      title: 'Perhatikan Ketinggian Air',
      description: 'Jangan berada di bantaran sungai atau memancing jika debit air tiba-tiba meningkat atau berubah warna menjadi coklat pekat, karena ini menandakan potensi banjir bandang.',
      icon: <Waves size={32} className="text-cyan-400" />,
      color: 'border-cyan-400'
    },
    {
      title: 'Hindari Air Tercemar',
      description: 'Hindari kontak kulit dengan air sungai jika tercium bau menyengat, terlihat limbah pabrik, atau tumpukan sampah basah yang dapat membawa bakteri penyakit.',
      icon: <Droplets size={32} className="text-yellow-400" />,
      color: 'border-yellow-400'
    },
    {
      title: 'Waspada Area Longsor',
      description: 'Jauhi area tebing sungai yang curam, terutama setelah atau saat hujan lebat. Tanah yang terkikis arus sungai sangat rawan longsor tanpa peringatan.',
      icon: <AlertTriangle size={32} className="text-red-400" />,
      color: 'border-red-400'
    },
    {
      title: 'Gunakan Jalur Evakuasi',
      description: 'Ketahui letak jalur evakuasi dan titik kumpul terdekat di lingkungan Anda. Jika peringatan darurat AQUA EYE berbunyi, segera ikuti rambu ke tempat tinggi.',
      icon: <LifeBuoy size={32} className="text-green-400" />,
      color: 'border-green-400'
    },
  ];

  return (
    <div className="p-4 max-w-lg mx-auto pb-24 space-y-6 animate-fade-in">
      <div className="mb-6 border-l-4 border-cyan-400 pl-3">
        <h1 className="font-heading font-black text-2xl text-white">Edukasi Keselamatan</h1>
        <p className="text-xs text-gray-400">Panduan aman beraktivitas di sekitar sungai.</p>
      </div>

      <div className="grid gap-4">
        {cards.map((card, idx) => (
          <div key={idx} className={`bg-[var(--color-surface-2)] border-2 ${card.color} p-5 shadow-[4px_4px_0_0_#000] flex gap-4 items-start`}>
            <div className="shrink-0 p-2 bg-[var(--color-surface-1)] border-2 border-black rounded-full shadow-[2px_2px_0_0_#000]">
              {card.icon}
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-1">{card.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Contact */}
      <div className="mt-8 bg-[var(--color-danger)] border-4 border-black p-5 shadow-[6px_6px_0_0_#000] flex flex-col items-center justify-center text-center">
        <div className="bg-white p-3 rounded-full border-2 border-black mb-3">
          <Phone size={28} className="text-red-600" />
        </div>
        <h3 className="font-heading font-black text-lg text-white uppercase tracking-wider mb-1">
          Layanan Darurat
        </h3>
        <p className="text-xs text-red-100 mb-4">
          Hubungi jika ada korban tenggelam atau bencana yang mengancam nyawa.
        </p>
        <button className="bg-black text-white font-bold text-xl px-8 py-3 border-2 border-white hover:bg-gray-900 transition-colors">
          112
        </button>
      </div>

    </div>
  );
}

// Temporary icon component since Waves isn't imported from lucide-react in the snippet above
function Waves(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
  );
}
