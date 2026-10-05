import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { resolve } from 'node:path'

// Sitio de varias páginas: cada .html es una página con su propio título y descripción.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        gracias: resolve(import.meta.dirname, 'gracias.html'),
        privacidad: resolve(import.meta.dirname, 'privacidad.html'),
        notfound: resolve(import.meta.dirname, '404.html'),
        terminos: resolve(import.meta.dirname, 'terminos.html'),
        plantillas: resolve(import.meta.dirname, 'plantillas-canva.html'),
        apps: resolve(import.meta.dirname, 'apps.html'),
      },
    },
  },
})
