// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     exclude: ['lucide-react'],
//   },
// })



// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     exclude: ['lucide-react'],
//   },
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5173',
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// })


import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  // Load environment variables for the current mode
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    root: 'frontend',
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      proxy: {
        '/api': {
          target: `http://127.0.0.1:${env.VITE_API_PORT || '5000'}`, // Use the loaded env variable
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  });
};