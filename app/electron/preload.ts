/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer } from "electron";

const windowApi = {
  fileDialog: (): Promise<unknown> => ipcRenderer.invoke("file-dialog"),
  loadPreferences: (): Promise<unknown> => ipcRenderer.invoke("load-preferences"),
  closeWindow: (): void => ipcRenderer.send("close-window"),
  maximizeWindow: (): void => ipcRenderer.send("maximize-window"),
  minimizeWindow: (): void => ipcRenderer.send("minimize-window"),
};

const themeApi = {
  toggleDarkMode: (): Promise<unknown> => ipcRenderer.invoke("dark-mode:toggle-dark"),
  toggleToSystem: (): Promise<unknown> => ipcRenderer.invoke("dark-mode:toggle-system"),
  toggleLightMode: (): Promise<unknown> => ipcRenderer.invoke("dark-mode:toggle-light"),
  currentPreset: (): Promise<unknown> => ipcRenderer.invoke("dark-mode:current-preset"),
};

const fileService = {
  downloadExecucao: (kw: PayloadDownloadExecucao): Promise<void> =>
    ipcRenderer.invoke("file-service:download-execucao", kw),
};

const cookieService = {
  getCookies: (): Promise<cookieApp[]> => ipcRenderer.invoke("get-cookies"),
};

const safeStorageApi = {
  load: (key: string): Promise<string> => ipcRenderer.invoke("safe-storage:load", key),
  save: (opt: optSave): Promise<void> => ipcRenderer.invoke("safe-storage:save", opt),
};

try {
  const exposes = {
    safeStorageApi: safeStorageApi,
    windowApi: windowApi,
    themeApi: themeApi,
    fileService: fileService,
    cookieService: cookieService,
    authService: {
      autenticarUsuario: (data: Record<string, any>): AuthReturn =>
        ipcRenderer.invoke("crawjud:autenticar", data),
    },
  };
  Object.entries(exposes).forEach(([k, v]) => contextBridge.exposeInMainWorld(k, v));
} catch (err) {
  console.log(err);
}

window.addEventListener("keypress", (e) => {
  if (e) {
    if (e.key === "F11") e.preventDefault();
    if (e.key === "F5") e.preventDefault();
  }
});
