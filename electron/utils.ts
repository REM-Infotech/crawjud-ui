import { app, safeStorage, type Event } from "electron";
import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";

export async function salvarSenha(_: Event, login: string, senha: string) {
  if (!safeStorage.isEncryptionAvailable()) {
    throw new Error("Criptografia não disponível neste sistema!");
  }

  const encrypted = safeStorage.encryptString(senha);

  const file = path.join(app.getPath("userData"), "senhas.json");

  let data: { [key: string]: string } = {};

  if (existsSync(file)) {
    data = JSON.parse(readFileSync(file).toString());
  }

  data[login] = encrypted.toString("base64"); // salvar como base64

  writeFileSync(file, JSON.stringify(data));
}

export async function carregarSenha(_: Event, login: string): Promise<string | null> {
  const file = path.join(app.getPath("userData"), "senhas.json");

  if (!existsSync(file)) return null;

  const data = JSON.parse(readFileSync(file).toString());
  if (!data[login]) return null;

  const encryptedBuffer = Buffer.from(data[login], "base64");
  const senha = safeStorage.decryptString(encryptedBuffer);

  return senha;
}
