import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/japanese-practise/", //repo name
  plugins: [
    react(),
    VitePWA({
      manifestFilename: "icons/site.webmanifest",
      manifest: {
        name: "五十音練習",
        short_name: "五十音",
        theme_color: "#a788d9",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "icons/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icons/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      injectRegister: "auto",
      registerType: "autoUpdate",
    }),
  ],
});
