import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    include: ["typescript", "vite-svg-loader"],
  },
  plugins: [],
  server: {
    port: 3000,
    host: "0.0.0.0", 
  },
});
