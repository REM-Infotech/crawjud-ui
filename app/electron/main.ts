/* eslint-disable @typescript-eslint/no-explicit-any */
import { app, BrowserWindow, ipcMain } from "electron";

import { join, resolve } from "path";
import IpcApp from "./ipc";
import WindowUtils from "./window";

import useAuthService from "@/services/authService";
import useBotService from "@/services/botService";
import useCookieService from "@/services/cookieService";
import useSafeStorage from "@/services/safeStoreService";
import useThemeService from "@/services/themeService";

export let mainWindow: BrowserWindow | null = null;
const preload_path = resolve(join(__dirname, "../preload", "preload.js"));

function createWindow() {
  mainWindow = new BrowserWindow({
    title: "CrawJUD",
    width: 1600,
    height: 900,
    resizable: false,
    maximizable: false,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: false,
      devTools: !app.isPackaged,
      preload: preload_path,
    },
  });
  mainWindow.webContents.on("will-navigate", (event, url) => {
    const currentUrl = mainWindow?.webContents.getURL();
    if (url !== currentUrl) {
      event.preventDefault();
    }
  });

  mainWindow.webContents.on("before-input-event", (event, input) => {
    const isBack = input.key === "BrowserBack" || (input.key === "ArrowLeft" && input.alt);

    if (isBack) {
      event.preventDefault();
    }
  });

  if (process.argv.includes("--devtools") || !app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
  if (app.isPackaged) {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
    return;
  }

  mainWindow.loadURL("http://localhost:3000/#/");
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", WindowUtils.DeepLink);

  // Create mainWindow, load the rest of the app, etc...
  app.whenReady().then(async () => {
    IpcApp();
    useCookieService();
    useBotService();
    useThemeService();

    const { CookieService } = useCookieService();
    const safeService = useSafeStorage();
    const authService = await useAuthService();

    ipcMain.handle("get-cookies", async () => CookieService.loadCookies());
    ipcMain.handle("safe-storage:load", async (_, key: string) => safeService.load(key));
    ipcMain.handle("safe-storage:save", async (_, opt: optSave) => safeService.save(opt));
    ipcMain.handle("crawjud:autenticar", (_, data: Record<string, any>) =>
      authService.autenticarSessao(data),
    );

    createWindow();
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient("crawjud", process.execPath, [
      resolve(process.argv[1] as string),
    ]);
  }
} else {
  app.setAsDefaultProtocolClient("crawjud");
}
