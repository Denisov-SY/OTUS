import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";

// const __filename = fileURLToPath(new URL("./src", import.meta.url))
// console.log("__dirname: ", __dirname);
// console.log("__filename: ", __filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar({
      // sassVariables: ".\\src\\assets\\quasar-variables.sass",
      sassVariables: __dirname + "/src/assets/quasar-variables.sass",
      // sassVariables: "src/css/quasar.variables.sass",
      // sassVariables: "I:/Work/Proj_Web/Node.js/ISL2-VSW-ARM-CLT/src/css/quasar.variables.sass",
      // sassVariables: true,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 5000,
    sourcemap: true,
    compilerOptions: {},
  },
  // server: {hmr: { overlay: false}}
});
