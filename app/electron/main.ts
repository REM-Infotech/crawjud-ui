import useAuthService from "@/services/authService";
import useBotService from "@/services/botService";
import { app, BrowserWindow } from "electron";
import { join, resolve } from "path";
import IpcApp from "./ipc";
import WindowUtils from "./window";

export let mainWindow: BrowserWindow | null = null;
let preload_path = resolve(join(__dirname, "../preload", "preload.js"));

function createWindow() {
  mainWindow = new BrowserWindow({
    title: "CrawJUD",
    minWidth: 1280,
    minHeight: 800,
    width: 1280,
    height: 800,
    frame: false,
    transparent: true,
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
    IpcApp();
    useBotService();
    useAuthService();
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
