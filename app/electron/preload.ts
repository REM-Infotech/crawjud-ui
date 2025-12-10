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

contextBridge.exposeInMainWorld("windowApi", windowApi);
contextBridge.exposeInMainWorld("themeApi", themeApi);

window.addEventListener("keypress", (e) => {
  if (e) {
    if (e.key === "F11") e.preventDefault();
    if (e.key === "F5") e.preventDefault();
  }
});
