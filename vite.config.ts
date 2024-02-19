import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      base: '/zoiex/',
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        cleanupOutdatedCaches: true,
        globDirectory: 'dist/',
        swDest: 'dist/sw.js',
        globPatterns: [
          '**/*.{js, css, html, png, jpg, jpeg, svg, woff2, woff, ttf, oet, ico, txt }'
        ]
      },
      manifest: {
        name: 'Zoiex App',
        short_name: 'Zoiex',
        start_url: '.',
        display: 'fullscreen',
        background_color: '#fff',
        description: 'Zoiex test project',
        icons: [
          {
            src: 'img/icons/favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png'
          },
          {
            src: 'img/icons/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png'
          },
          {
            src: 'img/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'img/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  base: process.env.NODE_ENV === 'development' ? '/' : '/zoiex/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
