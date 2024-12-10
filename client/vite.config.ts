import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Binds to 0.0.0.0 during development
    port: 3000       // Port 3000 for consistency with Render's requirements
  },
  preview: {
    host: '0.0.0.0', // Binds to 0.0.0.0 during preview
    port: 3000       // Port 3000 for preview mode
  }
});
