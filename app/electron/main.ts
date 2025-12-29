import CrawJUD2 from "@/assets/img/crawjud2.ico";
import { app, BrowserWindow, shell } from "electron";
import { join, resolve } from "path";
import IpcApp from "./ipc";

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
    icon: CrawJUD2,
    webPreferences: {
      nodeIntegration: false,
      devTools: true,
      preload: preload_path,
      partition: "persist:CrawJudApp",
    },
  });
  mainWindow.webContents.on("will-navigate", (event, url) => {
    const currentUrl = mainWindow?.webContents.getURL();
    if (url !== currentUrl) {
      event.preventDefault();
    }
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url); // Open the URL in the user's default browser
    return { action: "deny" }; // Prevent the app from opening it internally
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

// const gotTheLock = app.requestSingleInstanceLock();

// if (!gotTheLock) {
//   app.quit();
// } else {

// }

// Create mainWindow, load the rest of the app, etc...
app.whenReady().then(async () => {
  IpcApp();
  useThemeService();
  createWindow();
  app.configureHostResolver({
    enableBuiltInResolver: true,
    secureDnsServers: ["https://one.one.one.one/dns-query"],
  });
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// if (process.defaultApp) {
//   if (process.argv.length >= 2) {
//     app.setAsDefaultProtocolClient("crawjud", process.execPath, [
//       resolve(process.argv[1] as string),
//     ]);
//   }
// } else {
//   app.setAsDefaultProtocolClient("crawjud");
// }
