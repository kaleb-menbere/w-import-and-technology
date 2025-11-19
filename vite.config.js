import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all Frappe API endpoints to YOUR Frappe backend
      '/api': {
        target: 'http://196.189.155.194:8004', // ← Change this
        changeOrigin: true,
        secure: false, // ← Change to false for HTTP
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      },
      '/method': {
        target: 'http://196.189.155.194:8004', // ← Change this
        changeOrigin: true,
        secure: false, // ← Change to false for HTTP
      },
      '/resource': {
        target: 'http://196.189.155.194:8004', // ← Change this
        changeOrigin: true,
        secure: false, // ← Change to false for HTTP
      },
      '/files': {
        target: 'http://196.189.155.194:8004', // ← Change this
        changeOrigin: true,
        secure: false, // ← Change to false for HTTP
      }
    }
  }
})