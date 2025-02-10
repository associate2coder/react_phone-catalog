import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "./src/styles/_variables.scss" as vars;
          @use "./src/styles/_mixins.scss" as mixins;
          @import "./src/styles/_typography";
        `,
      },
    },
  },
});
