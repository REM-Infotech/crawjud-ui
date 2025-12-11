import { resolve } from "path";
import { defineConfig } from "vite";

const isDev: boolean = process.env.NODE_ENV === "development";
const isProd: boolean = process.env.NODE_ENV === "production";

const workDir = process.cwd();

export default defineConfig({
  mode: process.env.NODE_ENV,
  build: {
    rollupOptions: {
      external: ["minio", "fs", "path", "crypto", "http", "https"],
    },
    outDir: resolve(workDir, ".vite/preload"),
    minify: isProd,
    watch: isDev ? {} : null,
  },
  resolve: {
    alias: {
      "@": resolve(workDir, "app"),
      "#electron": resolve(workDir, "app/electron"),
      "#utils": resolve(workDir, "app", "electron", "utils"),
    },
  },
});
