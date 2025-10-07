/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    exclude: [
      'node_modules/**',
      'dist/**',
      '.idea/**',
      '.git/**',
      '.cache/**'
    ],
    include: ['src/**/*.{test,spec}.{js,jsx}']
  }
});