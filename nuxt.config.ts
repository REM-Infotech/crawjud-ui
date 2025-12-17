// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
import IconsResolve from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import Components from "unplugin-vue-components/vite";

const workDir = process.cwd();

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["bootstrap/dist/css/bootstrap.css", "~/assets/css/main.css", "~/assets/css/bot/index.css"],
  modules: ["@bootstrap-vue-next/nuxt", "@pinia/nuxt"],
  plugins: [
    "~/plugins/bootstrap.client.ts",
    "~/plugins/datatables.client.ts",
    "~/plugins/uuid.client.ts",
    "~/plugins/sync-cookies.client.ts",
    "~/plugins/botservice.client.ts",
    "~/plugins/socketio.client.ts",
    "~/plugins/api.client.ts",
  ],
  telemetry: false,
  ssr: false,
  bootstrapVueNext: {
    composables: true,
    directives: { all: true },
  },
  app: {
    baseURL: "./",
    buildAssetsDir: "/assets",
    pageTransition: { name: "page", mode: "out-in" },
  },

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
