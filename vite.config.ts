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
        reembolsos: resolve(import.meta.dirname, 'reembolsos.html'),
        cookies: resolve(import.meta.dirname, 'cookies.html'),
        'paginas-web': resolve(import.meta.dirname, 'paginas-web.html'),
        'diseno-para-redes': resolve(import.meta.dirname, 'diseno-para-redes.html'),
        'bases-de-datos': resolve(import.meta.dirname, 'bases-de-datos.html'),
        'seguridad-y-soporte': resolve(import.meta.dirname, 'seguridad-y-soporte.html'),
      },
    },
  },
})
