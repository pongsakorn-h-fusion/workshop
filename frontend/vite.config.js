import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    // allow Codespaces forwarded host (e.g. https://<name>-5173.app.github.dev)
    allowedHosts: ['.app.github.dev'],
    proxy: {
      // forward same-origin /api calls to the backend, avoiding CORS entirely
      '/api': {
        target: 'http://localhost:5019',
        changeOrigin: true,
      },
    },
  },
})
