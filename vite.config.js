import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      includeAssets: ['**/*'],
      manifest: {
        name: 'القرآن الكريم',
        short_name: 'القرآن',
        description: 'تطبيق القرآن الكريم الشامل — قراءة وتجويد وأذكار ومواقيت',
        theme_color: '#0c84e4',
        background_color: '#0f1117',
        display: 'standalone',
        orientation: 'portrait',
        lang: 'ar',
        dir: 'rtl',
        start_url: '/',
        scope: '/',
        categories: ['religion', 'education'],
        icons: [
          { src: '/Images/faviconLogo.jpg', sizes: '192x192', type: 'image/jpeg', purpose: 'any maskable' },
          { src: '/Images/faviconLogo.jpg', sizes: '512x512', type: 'image/jpeg', purpose: 'any maskable' }
        ],
        shortcuts: [
          { name: 'قراءة القرآن', url: '/' },
          { name: 'مواقيت الصلاة', url: '/?tab=12' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg,woff,woff2,ttf,json}'],
        maximumFileSizeToCacheInBytes: 8388608,
        navigateFallback: '/index.html',
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.alquran\.cloud\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'quran-api-v2', expiration: { maxEntries: 700, maxAgeSeconds: 7776000 }, cacheableResponse: { statuses: [0, 200] } }
          },
          {
            urlPattern: /^https:\/\/cdn\.islamic\.network\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'islamic-cdn-v2', expiration: { maxEntries: 150, maxAgeSeconds: 7776000 }, cacheableResponse: { statuses: [0, 200] } }
          },
          {
            urlPattern: /^https:\/\/api\.aladhan\.com\/.*/i,
            handler: 'NetworkFirst',
            options: { cacheName: 'prayer-times-v2', networkTimeoutSeconds: 6, expiration: { maxEntries: 90, maxAgeSeconds: 172800 }, cacheableResponse: { statuses: [0, 200] } }
          },
          {
            urlPattern: /^https:\/\/quran-endpoint\.vercel\.app\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'quran-endpoint', expiration: { maxEntries: 200, maxAgeSeconds: 5184000 }, cacheableResponse: { statuses: [0, 200] } }
          },
          {
            urlPattern: /^https:\/\/ahegazy\.github\.io\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'azkar-v2', expiration: { maxEntries: 20, maxAgeSeconds: 2592000 }, cacheableResponse: { statuses: [0, 200] } }
          },
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/gh\/fawazahmed0\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'hadith-v2', expiration: { maxEntries: 50, maxAgeSeconds: 5184000 }, cacheableResponse: { statuses: [0, 200] } }
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-css', expiration: { maxEntries: 10 } }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'google-fonts-woff', expiration: { maxEntries: 30, maxAgeSeconds: 31536000 }, cacheableResponse: { statuses: [0, 200] } }
          },
          {
            urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'cdn-assets', expiration: { maxEntries: 40, maxAgeSeconds: 2592000 }, cacheableResponse: { statuses: [0, 200] } }
          },
          {
            urlPattern: /^https:\/\/nominatim\.openstreetmap\.org\/.*/i,
            handler: 'NetworkFirst',
            options: { cacheName: 'geocoding', networkTimeoutSeconds: 5, expiration: { maxEntries: 20, maxAgeSeconds: 604800 }, cacheableResponse: { statuses: [0, 200] } }
          }
        ]
      }
    })
  ],
})
