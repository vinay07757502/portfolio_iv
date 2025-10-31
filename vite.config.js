import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    hmr: {
      protocol: 'wss',
      clientPort: 443,
      host: process.env.REPLIT_DEV_DOMAIN || 'localhost'
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 5000
  }
})
