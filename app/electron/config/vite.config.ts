import { exec } from "child_process";
import { resolve } from "path";
import { defineConfig } from "vite";
import renderer from "vite-plugin-electron-renderer";

/**
 * Configure o build para copiar arquivos de .output/public.
 *
 * Returns:
 *     object: Configuração do Vite com plugin de cópia.
 */
const workDir = process.cwd();
export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      external: ["minio", "fs", "path", "crypto", "http", "https"],
      input: resolve(process.cwd(), "index.html"),
    },
    outDir: resolve(process.cwd(), ".vite/renderer"),
  },
  resolve: {
    alias: {
      "@": resolve(workDir, "app"),
      "#electron": resolve(workDir, "app/electron"),
      "#utils": resolve(workDir, "app", "electron", "utils"),
    },
  },
  plugins: [
    {
      name: "copy-nuxt-output-public",
      apply: "build",
      buildStart() {
        this.addWatchFile(resolve(process.cwd(), ".build"));
      },
      async writeBundle() {
        const script_python = resolve(process.cwd(), "scripts", "copy_nuxt_public.py");

        await new Promise<void>((resolve, reject) => {
          exec(`py -3.14t "${script_python}"`, (error, stdout, stderr) => {
            if (error) {
              console.error(`Erro ao copiar arquivos: ${stderr}`);
              reject(error);
            } else {
              console.log(`Arquivos copiados com sucesso: ${stdout}`);
              resolve();
            }
          });
        });
      },
    },
    renderer({
      resolve: {
        serialport: { type: "cjs" },
        got: { type: "esm" },
      },
    }),
  ],
});
