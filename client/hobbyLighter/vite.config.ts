import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url))
    },
  },
  server: {
    host: true, // Bind the server to all network interfaces
    port: 5173, // Frontend port
    proxy: {
      '/api': {
        target: 'http://172.20.10.4:3000', // Replace with your computer's IP
        changeOrigin: true,
      },
    },
  },
})
