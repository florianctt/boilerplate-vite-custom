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
    setupFiles: './test/setupTest.ts',
  },
  /* DEVELOPMENT */
  server: {
    open: true,
  },
  /* PRODUCTION */
  build: {
    outDir: './build',
    rollupOptions: {
      // input: {
      //   admin: './admin/index.html',
      //   client: './client/index.html',
      // },
      output: {
        sourcemap: true,
        // preserveModules: true,
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
})
