import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["d6r744-5173.csb.app"], // coloque aqui o host mostrado no erro
  },
});
