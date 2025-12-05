import { VitePlugin } from "@electron-forge/plugin-vite";
import type { VitePluginConfig } from "@electron-forge/plugin-vite/dist/Config";
const vitePluginOptions: VitePluginConfig = {
  build: [
    {
      entry: "app/electron/main.ts",
      config: "electron/config/vite.main.config.ts",
      target: "main",
    },
    {
      entry: "app/electron/preload.ts",
      config: "electron/config/vite.preload.config.ts",
      target: "preload",
    },
  ],
  renderer: [
    {
      name: "CrawJUD",
      config: "electron/config/vite.config.ts",
    },
  ],
};
export default new VitePlugin(vitePluginOptions);
