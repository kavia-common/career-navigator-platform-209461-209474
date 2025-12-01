import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    host: true,
    strictPort: true,
    // Allow both historical and current preview domains to avoid dev/preview blocks
    allowedHosts: [
      'vscode-internal-14214-beta.beta01.cloud.kavia.ai',
      'vscode-internal-30572-beta.beta01.cloud.kavia.ai'
    ]
  },
  preview: {
    port: 3000,
    host: true,
    strictPort: true,
    allowedHosts: [
      'vscode-internal-14214-beta.beta01.cloud.kavia.ai',
      'vscode-internal-30572-beta.beta01.cloud.kavia.ai'
    ]
  }
});
