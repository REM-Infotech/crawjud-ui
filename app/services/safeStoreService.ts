import { app, safeStorage } from "electron";
import { existsSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import path from "path";

export default function useSafeStorage() {
  class safeStoreService implements ISafeStoreService {
    constructor() {}

    async save(opt: optSave) {
      if (!opt.key || !safeStorage.isEncryptionAvailable()) return;

      const encrypted = safeStorage.encryptString(opt.value);
      const file = path.join(app.getPath("userData"), "dataStore.ec");

      let data: { [key: string]: string } = {};
      if (existsSync(file)) {
        data = JSON.parse((await readFile(file)).toString());
      }
      data[opt.key] = encrypted.toString("base64"); // salvar como base64
      await writeFile(file, JSON.stringify(data));
    }

    async load(key: string): Promise<string | null | undefined> {
      if (!key || !safeStorage.isEncryptionAvailable()) return;

      const file = path.join(app.getPath("userData"), "dataStore.ec");
      if (!existsSync(file)) return null;

      const data = JSON.parse((await readFile(file)).toString());
      if (!data[key]) return null;

      const encryptedBuffer = Buffer.from(data[key], "base64");
      return safeStorage.decryptString(encryptedBuffer);
    }
  }

  const safeService = new safeStoreService();
  return safeService;
}
