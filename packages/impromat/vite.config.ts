import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    legacy(),
    VitePWA({
      manifest: {
        short_name: "Impromat",
        name: "Impromat",
        icons: [
          {
            src: "assets/icon/favicon.png",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "assets/icon/icon192.png",
            sizes: "192x192",
            type: "image/x-icon",
          },
          {
            src: "assets/icon/icon.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable any",
          },
        ],
        lang: "en", // TODO add de
        scope: "/",
        start_url: "/",
        display: "standalone",
        theme_color: "#3880ff",
        background_color: "#ffffff",
      },
      filename: "service-worker.js",
      registerType: "prompt",
      includeManifestIcons: true,
      includeAssets: ["assets/**/*.svg", "assets/**/*.png"],
    }),
  ],
  server: {
    port: Number(process.env.PORT ?? 3000),
  },
  build: {
    chunkSizeWarningLimit: 1_5000,
    sourcemap: true,
  },
  preview: { host: "localhost", port: Number(process.env.PORT ?? 3000) },
});
