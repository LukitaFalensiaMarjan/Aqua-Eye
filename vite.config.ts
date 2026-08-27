import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/Aqua-Eye/', // Wajib sama persis dengan nama repository GitHub (termasuk huruf besar/kecil)
});
