import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import {resolve} from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // root: resolve(__dirname, 'src'),
  // build: {
  //   outDir: '../dist'
  // },
  // server: {
  //   port: 8080
  // }
})

