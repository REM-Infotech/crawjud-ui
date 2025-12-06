import { app, safeStorage } from "electron";
import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";

type optSave = { key: string; value: string };

class safeStoreService {
  static save(opt: optSave) {
    if (!opt.key) return;
    if (!safeStorage.isEncryptionAvailable()) return;

    const encrypted = safeStorage.encryptString(opt.value);
    const file = path.join(app.getPath("userData"), "dataStore.json");

    let data: { [key: string]: string } = {};
    if (existsSync(file)) {
      data = JSON.parse(readFileSync(file).toString());
    }
    data[opt.key] = encrypted.toString("base64"); // salvar como base64
    writeFileSync(file, JSON.stringify(data));
  }

  static load(key: string) {
    if (!safeStorage.isEncryptionAvailable()) return;

    const file = path.join(app.getPath("userData"), "dataStore.json");
    if (!existsSync(file)) return null;

    const data = JSON.parse(readFileSync(file).toString());
    if (!data[key]) return null;

    const encryptedBuffer = Buffer.from(data[key], "base64");

    return safeStorage.decryptString(encryptedBuffer);
  }
}

export default safeStoreService;
