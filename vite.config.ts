import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    include: ["typescript", "vite-svg-loader"],
  },
  plugins: [],
  server: {
    host: true,
    port: 3000,
  },
});
