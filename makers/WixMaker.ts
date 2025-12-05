import type { MakerWixConfig } from "@electron-forge/maker-wix";
import { MakerWix } from "@electron-forge/maker-wix";
import { resolve } from "path";
import { productName, version } from "../package.json";
const ROOT = process.cwd();
const wixOptions: MakerWixConfig = {
  arch: "x64",
  shortName: productName,
  appUserModelId: "dev.robotz.crawjud",
  description: "CrawJUD Automatização",
  manufacturer: "REM INFOTECH",
  shortcutFolderName: productName,
  programFilesFolderName: productName,
  name: productName,
  exe: `${productName}.exe`,
  icon: resolve(ROOT, "app/assets/img/crawjud2.ico"),
  ui: {
    chooseDirectory: true,
  },
  features: {
    autoLaunch: true,
    autoUpdate: false,
  },
  version: version,
  language: 1046, // 1046 corresponde ao português do Brasil
};

export default new MakerWix(wixOptions, ["win32"]);
