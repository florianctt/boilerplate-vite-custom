/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  /* CSS */
  css: {
    devSourcemap: true,
  },
  /* TEST */
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setupTests.ts',
  },
  /* DEVELOPMENT */
  server: {
    open: true,
  },
  /* PRODUCTION */
  build: {
    outDir: './build',
    rollupOptions: {
      output: {
        sourcemap: true,
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
})
