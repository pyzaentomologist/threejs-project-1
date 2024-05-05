import { defineConfig } from "vite";

export default defineConfig({
  publicDir: "./static/",
  optimizeDeps: {
    include: ["typescript", "vite-svg-loader"],
  },
  plugins: [],
  server: {
    port: 3000,
    host: true,
  },
});
