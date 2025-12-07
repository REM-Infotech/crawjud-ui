// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
import IconsResolve from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import Components from "unplugin-vue-components/vite";
import renderer from "vite-plugin-electron-renderer";
import electron from "vite-plugin-electron/simple";

const workDir = process.cwd();

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  app: {
    baseURL: "./",
    buildAssetsDir: "/assets",
    pageTransition: { name: "page", mode: "out-in" },
  },
  ssr: false,
  runtimeConfig: {
    app: {
      baseURL: "./",
    },
  },
  nitro: {
    baseURL: "./",
    preset: "static",
    output: {
      publicDir: resolve(workDir, ".build/"),
    },

    runtimeConfig: {
      app: {
        baseURL: "./",
      },
    },
  },
  router: {
    options: {
      hashMode: true,
    },
  },
  devtools: { enabled: true },
  css: ["bootstrap/dist/css/bootstrap.css", "~/assets/css/main.css"],
  modules: ["@bootstrap-vue-next/nuxt", "@pinia/nuxt"],
  plugins: ["~/plugins/bootstrap.client.ts", "~/plugins/datatables.client.ts"],
  telemetry: false,
  bootstrapVueNext: {
    composables: true,
    directives: { all: true },
  },
  vite: {
    plugins: [
      Components({
        resolvers: [IconsResolve()],
        dts: true,
      }),
      Icons({
        compiler: "vue3",
        autoInstall: true,
      }),
      electron({
        main: {
          entry: resolve(workDir, "app/electron/main.ts"),
          vite: {
            configFile: resolve(workDir, "app/electron/config/vite.main.config.ts"),
          },
        },
        preload: {
          input: resolve(workDir, "app/electron/preload.ts"),
          vite: {
            configFile: resolve(workDir, "app/electron/config/vite.preload.config.ts"),
          },
        },
      }),
      renderer({
        resolve: {
          serialport: { type: "cjs" },
          got: { type: "esm" },
        },
      }),
    ],
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ["unplugin-icons/types/vue"],
      },
    },
  },
});
