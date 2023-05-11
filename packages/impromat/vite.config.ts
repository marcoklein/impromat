import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), legacy(), VitePWA()],
  server: {
    port: Number(process.env.PORT ?? 3000),
  },
  preview: { host: "localhost", port: Number(process.env.PORT ?? 3000) },
});
