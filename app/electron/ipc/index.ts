/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserWindow, dialog, ipcMain, shell, type IpcMainInvokeEvent } from "electron";
import { writeFile } from "fs/promises";
import { homedir } from "os";
import { join, resolve } from "path";
import { pathToFileURL } from "url";

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

export default function IpcApp(mainWindow: BrowserWindow) {
  const browserWindow = mainWindow ? BrowserWindow.fromId(mainWindow.id) : undefined;
  browserWindow?.webContents.on("before-input-event", IpcUtils.beforeInputEvent);
  ipcMain.on("close-window", IpcUtils.CloseWindow);
  ipcMain.on("minimize-window", IpcUtils.MinimizeWindow);
  ipcMain.on("maximize-window", IpcUtils.MaximizeWindow);
  ipcMain.handle(
    "file-service:to-file-url",
    (_: IpcMainInvokeEvent, pathFile: string) => pathToFileURL(pathFile).href,
  );
  ipcMain.handle("file-service:download-execucao", async (_: any, kw: PayloadDownloadExecucao) => {
    if (!mainWindow) return;
    const dialogFile = await dialog.showSaveDialog(mainWindow, {
      title: "Escolha onde salvar a execução",
      defaultPath: resolve(homedir(), kw.file_name),
      filters: [
        {
          name: "Arquivo de execução compactado",
          extensions: ["zip"],
        },
      ],
    });

    if (dialogFile.canceled) return;

    const filePath = join(dialogFile.filePath);
    const buff = Uint8Array.fromBase64(kw.content);
    await writeFile(filePath, buff);
    return dialogFile.filePath;
  });

  ipcMain.handle("show-file-execution", (_: IpcMainInvokeEvent, filePath: string) => {
    shell.showItemInFolder(filePath);
  });
}
