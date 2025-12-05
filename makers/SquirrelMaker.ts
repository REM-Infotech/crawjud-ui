import type { MakerSquirrelConfig } from "@electron-forge/maker-squirrel";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";

const squirrelOptions: MakerSquirrelConfig = {
  authors: "Nicholas silva <nicholas@robotz.dev>",
  copyright: "Copyright © 2025 REM DEVS",
  owners: "REM INFOTECH",
  title: "CrawJUD",
  description: "CrawJUD Automatização",
};

export default new MakerSquirrel(squirrelOptions, ["win32"]);
