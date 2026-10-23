import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Configure base path for GitHub Pages deployment:
// Default is '/itz-fizz-scroll-hero/' for repo deployment, or '/' for root/custom domain.
const base = process.env.BASE_PATH || (process.env.NODE_ENV === 'production' ? '/itz-fizz-scroll-hero/' : '/')

export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000,
    open: false,
    host: true,
  },
})
