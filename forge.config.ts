import { resolve } from "path";

import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";

import { MakerZIP } from "@electron-forge/maker-zip";

import { AutoUnpackNativesPlugin } from "@electron-forge/plugin-auto-unpack-natives";

import type { ForgeConfig } from "@electron-forge/shared-types";

import WixMaker from "./makers/WixMaker";
import NuxtFixesPlugin from "./plugins/NuxtFixes";
import ViteForgePlugin from "./plugins/ViteForgePlugin";

const ROOT = process.cwd();

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    osxSign: {},
    icon: resolve(ROOT, "app/assets/img/crawjud2.ico"),
  },
  plugins: [new AutoUnpackNativesPlugin({}), NuxtFixesPlugin, ViteForgePlugin],
  makers: [
    WixMaker,
    new MakerZIP({}, ["darwin"]),
    new MakerDeb({}, ["linux"]),
    new MakerRpm({}, ["linux"]),
  ],
};

export default config;
