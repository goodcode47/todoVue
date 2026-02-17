import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  base: '/todoVue/',
  plugins: [vue()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
