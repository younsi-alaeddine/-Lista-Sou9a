import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['sou9a-logo.svg'],
      manifest: {
        name: 'Lista Sou9a',
        short_name: 'Sou9a',
        description: 'قائمة تسوق تونسية ساهلة و ذكية',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        start_url: '/',
        lang: 'ar-TN',
        dir: 'rtl',
        icons: [
          {
            src: '/sou9a-logo.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
          {
            src: '/sou9a-logo.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
          },
        ],
      },
    }),
  ],
})

