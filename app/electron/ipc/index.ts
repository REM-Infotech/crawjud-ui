/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseWindow, BrowserWindow, dialog, ipcMain } from "electron";

class IpcUtils {
  static beforeInputEvent(event: Electron.Event, input: Electron.Input) {
    if (input.control && (input.alt || input.shift || !input.alt || !input.shift))
      event.preventDefault();
    if (input.control && input.alt) event.preventDefault();
  }

  static CloseWindow(event: { sender: any }) {
    const webContents = event.sender;

    const diag = dialog.showMessageBoxSync({
      type: "question",
      buttons: ["Sim", "Não"],
      title: "Confirmação",
      message: "Tem certeza que deseja fechar a janela?",
      defaultId: 1,
      cancelId: 1,
    });

    if (diag === 1) return;

    const mainWindow = BrowserWindow.fromWebContents(webContents);
    mainWindow?.close();
  }

  static MinimizeWindow(event: { sender: any }) {
    const webContents = event.sender;
    const mainWindow = BrowserWindow.fromWebContents(webContents);
    mainWindow?.minimize();
  }

  static MaximizeWindow(event: { sender: any }) {
    const webContents = event.sender;
    const mainWindow = BrowserWindow.fromWebContents(webContents);
    if (mainWindow?.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow?.maximize();
    }
  }
}

export default function IpcApp() {
  const mainWindow = BaseWindow.getAllWindows()[0];
  const browserWindow = mainWindow ? BrowserWindow.fromId(mainWindow.id) : undefined;
  browserWindow?.webContents.on("before-input-event", IpcUtils.beforeInputEvent);
  ipcMain.on("close-window", IpcUtils.CloseWindow);
  ipcMain.on("minimize-window", IpcUtils.MinimizeWindow);
  ipcMain.on("maximize-window", IpcUtils.MaximizeWindow);
}
