import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL || '').replace(/\/$/, '')

  if (!siteUrl && mode === 'production') {
    console.warn(
      '[seo] VITE_SITE_URL is empty. WhatsApp/Open Graph previews need an absolute URL (e.g. https://tu-dominio.com).',
    )
  }

  return {
    plugins: [
      react(),
      {
        name: 'inject-site-url',
        transformIndexHtml(html) {
          // Absolute URLs are required for WhatsApp / Open Graph crawlers.
          return html.replaceAll('%SITE_URL%', siteUrl)
        },
      },
    ],
  }
})
