import { resolve } from "path";
import { defineConfig } from "vite";
const isDev: boolean = process.env.NODE_ENV === "development";
const isProd: boolean = process.env.NODE_ENV === "production";

const workDir = process.cwd();

export default defineConfig({
  mode: process.env.NODE_ENV,
  build: {
    outDir: resolve(workDir, ".vite/main"),
    minify: isProd,
    watch: isDev ? {} : null,
  },
});
