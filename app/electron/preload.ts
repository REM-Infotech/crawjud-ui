import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  fileDialog: () => ipcRenderer.invoke("file-dialog"),
  isJwtToken: () => ipcRenderer.invoke("is-jwt-token"),

  loadPreferences: () => ipcRenderer.invoke("load-preferences"),
  closeWindow: () => ipcRenderer.send("close-window"),
  maximizeWindow: () => ipcRenderer.send("maximize-window"),
  minimizeWindow: () => ipcRenderer.send("minimize-window"),
  toggleDarkMode: () => ipcRenderer.invoke("dark-mode:toggle-dark"),
  toggleToSystem: () => ipcRenderer.invoke("dark-mode:toggle-system"),
  toggleLightMode: () => ipcRenderer.invoke("dark-mode:toggle-light"),
  currentPreset: () => ipcRenderer.invoke("dark-mode:current-preset"),
  authenticateUser: (username: string, password: string) =>
    ipcRenderer.invoke("authenticate-user", username, password),
});

contextBridge.exposeInMainWorld("botApi", {
  listagemBots: () => ipcRenderer.invoke("listagem-bots"),
  listagemCredenciais: (sistema: SystemBots) => ipcRenderer.invoke("listagem-credenciais", sistema),
});

contextBridge.exposeInMainWorld("storageApi", {
  uploadFiles: (files: File[]) => ipcRenderer.invoke("upload-files", files),
});

window.addEventListener("keypress", (e) => {
  if (e) {
    if (e.key === "F11") e.preventDefault();
    if (e.key === "F5") e.preventDefault();
  }
});
