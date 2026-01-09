import { app, safeStorage } from "electron";
import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";

class safeStoreService {
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

  load(key: string): string | undefined {
    if (!key || !safeStorage.isEncryptionAvailable()) return;

    const file = path.join(app.getPath("userData"), "dataStore.ec");
    if (!existsSync(file)) return;

    const data = JSON.parse(readFileSync(file).toString());
    if (!data[key]) return;

    const encryptedBuffer = Buffer.from(data[key], "base64");
    return safeStorage.decryptString(encryptedBuffer);
  }
}

export default new safeStoreService();
