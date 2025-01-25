import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const port = process.env.APP_PORT;
console.log('Server running on port'+ port);
console.log('Path:', __dirname);

export default defineConfig({
    plugins: [react()],
    base: './',
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    server: {
      proxy: {
        '/api': {
          target: `http://127.0.0.1:${port || '5000'}`,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    }
    build: {
    outDir: 'dist',
    rollupOptions: {
      input: path.resolve(__dirname, './index.html'), // Ensure the entry point is correctly set
    },
  },
  });