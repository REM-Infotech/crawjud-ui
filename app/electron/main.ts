import CrawJUD2 from "@/assets/img/crawjud2.ico";
import { app, BrowserWindow, nativeImage, shell } from "electron";
import { join, resolve } from "path";
import IpcApp from "./ipc";

import useThemeService from "@/services/themeService";

export const mainWindow: BrowserWindow | null = null;
const preload_path = resolve(join(__dirname, "../preload", "preload.js"));

class MainWindow {
  public window: BrowserWindow | null = null;

  private getWindowOptions(): Electron.BrowserWindowConstructorOptions {
    const iconBase64 = CrawJUD2.split(",")[1] ?? CrawJUD2;
    const icon = nativeImage.createFromDataURL(iconBase64);

    return {
      title: "CrawJUD",
      width: 1600,
      height: 900,
      minWidth: 1280,
      minHeight: 720,
      resizable: true,
      maximizable: true,
      frame: !app.isPackaged,
      transparent: false,
      icon: icon,
      fullscreenable: true,
      webPreferences: {
        nodeIntegration: false,
        devTools: !app.isPackaged,
        preload: preload_path,
        partition: "persist:CrawJudApp",
      },
    };
  }

  private applyWindowSettings(win: BrowserWindow) {
    win.setTitle("CrawJUD");
    win.setResizable(false);
    win.setMaximizable(false);
    win.setFullScreenable(false);
    win.setFullScreen(false);
    win.setSize(1600, 900);
    win.setMaximumSize(1600, 900);
    win.setMinimumSize(1600, 900);
    win.setMenuBarVisibility(false);
    // Transparent and frame settings must be set at construction time
    // so they are omitted here, but you can document this if needed.
  }

  private setupWebContents(win: BrowserWindow) {
    win.webContents.on("will-navigate", (event, url) => {
      const currentUrl = win.webContents.getURL();
      if (url !== currentUrl) {
        event.preventDefault();
      }
    });

    win.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url);
      return { action: "deny" };
    });

    win.webContents.on("before-input-event", (event, input) => {
      const isBack = input.key === "BrowserBack" || (input.key === "ArrowLeft" && input.alt);
      if (isBack) {
        event.preventDefault();
      }
    });

    if (process.argv.includes("--devtools") || !app.isPackaged) {
      win.webContents.openDevTools();
    }
  }

  public create() {
    this.window = new BrowserWindow(this.getWindowOptions());

    this.setupWebContents(this.window);

    if (app.isPackaged) {
      this.window.loadFile(join(__dirname, "../renderer/index.html"));
    } else {
      this.window.loadURL("http://localhost:3000/#/");
    }
  }
}

const mainWindowInstance = new MainWindow();

// Create mainWindow, load the rest of the app, etc...
app.whenReady().then(async () => {
  mainWindowInstance.create();

  IpcApp(mainWindowInstance.window as BrowserWindow);
  useThemeService();

  app.configureHostResolver({
    enableBuiltInResolver: true,
    secureDnsServers: ["https://one.one.one.one/dns-query"],
  });
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    mainWindowInstance.create();
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
