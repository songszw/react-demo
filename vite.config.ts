import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve("./src")
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          '@primary-color': '#1DA57A',
        },
        javascriptEnabled: true
      }
    }
  }
})
