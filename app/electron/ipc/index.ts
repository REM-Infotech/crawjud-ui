import { app, BrowserWindow, ipcMain, safeStorage, type IpcMainInvokeEvent } from "electron";
import { BaseWindow } from "electron/main";
import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";

class IpcUtils {
  static beforeInputEvent(event: Electron.Event, input: Electron.Input) {
    if (input.control && (input.alt || input.shift || !input.alt || !input.shift))
      event.preventDefault();
    if (input.control && input.alt) event.preventDefault();
  }

  static SetTitle(event: { sender: any }, title: string) {
    const webContents = event.sender;
    const mainWindow = BrowserWindow.fromWebContents(webContents);
    mainWindow?.setTitle(title);
  }

  static async carregarSenha(_: IpcMainInvokeEvent, login: string): Promise<string | null> {
    const file = path.join(app.getPath("userData"), "senhas.json");

    if (!existsSync(file)) return null;

    const data = JSON.parse(readFileSync(file).toString());
    if (!data[login]) return null;

    const encryptedBuffer = Buffer.from(data[login], "base64");
    const senha = safeStorage.decryptString(encryptedBuffer);

    return senha;
  }

  static async salvarSenha(_: IpcMainInvokeEvent, login: string, senha: string) {
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
}

export default function IpcApp() {
  const mainWindow = BaseWindow.getAllWindows()[0];

  const browserWindow = mainWindow ? BrowserWindow.fromId(mainWindow.id) : undefined;
  browserWindow?.webContents.on("before-input-event", IpcUtils.beforeInputEvent);

  ipcMain.on("set-title", IpcUtils.SetTitle);
  ipcMain.handle("carregarSenha", IpcUtils.carregarSenha);
  ipcMain.handle("salvarSenha", IpcUtils.salvarSenha);
}
