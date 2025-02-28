import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    hmr: true, // Ensure HMR is enabled
  },
  plugins: [react(), tailwindcss(),],
})
