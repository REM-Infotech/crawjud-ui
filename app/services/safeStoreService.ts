import { app, safeStorage } from "electron";
import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";

export default function useSafeStorage() {
  class safeStoreService implements ISafeStoreService {
    constructor() {}

    save(opt: optSave) {
      if (!opt.key || !safeStorage.isEncryptionAvailable()) return;

      const encrypted = safeStorage.encryptString(opt.value);
      const file = path.join(app.getPath("userData"), "dataStore.ec");

      let data: { [key: string]: string } = {};
      if (existsSync(file)) {
        data = JSON.parse(readFileSync(file).toString());
      }
      data[opt.key] = encrypted.toString("base64"); // salvar como base64
      writeFileSync(file, JSON.stringify(data));
    }

    load(key: string): string | null | undefined {
      if (!key || !safeStorage.isEncryptionAvailable()) return;

      const file = path.join(app.getPath("userData"), "dataStore.ec");
      if (!existsSync(file)) return null;

      const data = JSON.parse(readFileSync(file).toString());
      if (!data[key]) return null;

      const encryptedBuffer = Buffer.from(data[key], "base64");
      return safeStorage.decryptString(encryptedBuffer);
    }
  }

  return new safeStoreService();
}
