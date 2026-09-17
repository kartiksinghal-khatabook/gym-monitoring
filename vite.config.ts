import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves this at https://<user>.github.io/gym-monitoring/, so
  // production assets need that prefix. Local dev stays at the root.
  base: command === 'build' ? '/gym-monitoring/' : '/',
  server: {
    host: true,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Gym Log',
        short_name: 'Gym Log',
        description: 'Personal gym workout tracker — log sessions, track PRs, watch progress.',
        theme_color: '#0f0f12',
        background_color: '#0f0f12',
        display: 'standalone',
        orientation: 'portrait',
        // Relative so they resolve correctly under the /gym-monitoring/ base path.
        start_url: '.',
        scope: '.',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
      },
    }),
  ],
}))
