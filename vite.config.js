import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  // === Development server config ===
  server: {
    proxy: {
      '/api/n8n': {
        target: 'https://solutionseekers.app.n8n.cloud',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/n8n/, ''),
        secure: false,
      }
    }
  },

  // === Build settings for embedding chatbot ===
  build: {
    outDir: 'dist',        // this is where your production chatbot will live
    emptyOutDir: true,     // clean folder before building
  }
})
