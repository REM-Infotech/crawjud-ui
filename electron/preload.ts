import { contextBridge, ipcRenderer } from "electron";

// ✅ Good code
contextBridge.exposeInMainWorld("electronAPI", {
  setTitle: (title: string) => ipcRenderer.send("set-title", title),
  salvarSenha: (login: string, senha: string) => ipcRenderer.invoke("salvarSenha", login, senha),
  carregarSenha: (login: string) => ipcRenderer.invoke("carregarSenha", login),
});

window.addEventListener("keypress", (e) => {
  if (e) {
    if (e.key === "F11") e.preventDefault();
    if (e.key === "F5") e.preventDefault();
  }
});
