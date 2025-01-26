// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     rollupOptions: {
//       external: ['react-calendar'], // Add this line
//     },
//   },
// });
import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensures relative paths for assets
  build: {
    chunkSizeWarningLimit: 1000, // Optional: Suppress chunk size warning
  },
});
