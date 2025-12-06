import { contextBridge, ipcRenderer } from "electron";

// ✅ Good code
contextBridge.exposeInMainWorld("electronAPI", {
  listagemBots: () => ipcRenderer.invoke("listagem-bots"),
  loadPreferences: () => ipcRenderer.invoke("load-preferences"),
  authenticateUser: (username: string, password: string) =>
    ipcRenderer.invoke("authenticate-user", username, password),
});

window.addEventListener("keypress", (e) => {
  if (e) {
    if (e.key === "F11") e.preventDefault();
    if (e.key === "F5") e.preventDefault();
  }
});
