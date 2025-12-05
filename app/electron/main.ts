import { app, BrowserWindow, ipcMain } from "electron";
import { join, resolve } from "path";
import IpcUtils from "./ipcMain";
import WindowUtils from "./window";

export let mainWindow: BrowserWindow | null = null;
let preload_path = resolve(join(__dirname, "../preload", "preload.js"));

if (process.env.NODE_ENV === "development") {
}

function createWindow() {
  mainWindow = new BrowserWindow({
    title: "CrawJUD",
    minWidth: 1280,
    minHeight: 800,
    width: 1280,
    height: 800,
    maxWidth: 1280,
    maxHeight: 800,
    maximizable: false, // This disables the maximize button
    webPreferences: {
      devTools: !app.isPackaged,
      preload: preload_path,
    },
  });

  if (process.argv.includes("--devtools") || !app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }

  if (app.isPackaged) {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
    return;
  }

  mainWindow.loadURL("http://localhost:3000/#/login");
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", WindowUtils.DeepLink);

  // Create mainWindow, load the rest of the app, etc...
  app.whenReady().then(() => {
    mainWindow?.webContents.on("before-input-event", IpcUtils.beforeInputEvent);
    ipcMain.on("set-title", IpcUtils.SetTitle);
    ipcMain.handle("carregarSenha", IpcUtils.carregarSenha);
    ipcMain.handle("salvarSenha", IpcUtils.salvarSenha);

    createWindow();
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
}

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient("crawjud", process.execPath, [
      resolve(process.argv[1] as string),
    ]);
  }
} else {
  app.setAsDefaultProtocolClient("crawjud");
}
