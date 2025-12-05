import { PluginBase } from "@electron-forge/plugin-base";
import { exec } from "child_process";

type NuxtFixesPluginConfig = {};

class NuxtFixesPlugin extends PluginBase<NuxtFixesPluginConfig> {
  name = "NuxtFixesPlugin";
  options: NuxtFixesPluginConfig;

  constructor(options: NuxtFixesPluginConfig = {}) {
    super(options);
    this.options = options;
  }

  override getHooks(): { prePackage: Array<() => Promise<void>> } {
    return {
      prePackage: [this.packageBeforeCopy.bind(this)],
    };
  }

  async packageBeforeCopy(): Promise<void> {
    // Executa comando "python scripts/fix_nuxt_paths.py"
    const result = new Promise<void>((resolve, reject) => {
      exec("py -3.14t scripts/fix_nuxt_paths.py", (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing script: ${error}`);
          reject(error);
          return;
        }
        console.log(`Script output: ${stderr}`);
        resolve();
      });
    });
    await result;
    console.log("NuxtFixesPlugin: Ajustou caminhos de assets em HTML, CSS e JS.");
  }
}

export default new NuxtFixesPlugin({});
