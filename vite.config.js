import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
            `@import "./src/styles/_theme.scss"; @import "./src/styles/_size.scss"; @import "./src/styles/_base.scss"; @import "./src/styles/_common.scss";`
      }
    }
  }
})
