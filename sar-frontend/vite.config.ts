import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import checker from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    react(), 
    viteCommonjs(), 
    tsconfigPaths(),
    checker({ typescript: true }),],
})
