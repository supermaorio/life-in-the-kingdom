import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves this project at https://<user>.github.io/life-in-the-kingdom/
export default defineConfig({
  plugins: [react()],
  base: "/life-in-the-kingdom/",
  build: { outDir: "dist", sourcemap: false }
});
