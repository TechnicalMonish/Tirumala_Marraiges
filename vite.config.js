import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Site deploys under a subpath; use relative asset paths.
export default defineConfig({
  base: './',
  plugins: [react()],
});
