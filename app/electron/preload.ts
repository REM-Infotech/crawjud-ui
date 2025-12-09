import { contextBridge, ipcRenderer } from "electron";

/**
 * API para operações de janela e preferências.
 */
const windowApi = {
  /**
   * Abrir diálogo de arquivos.
   * @returns {Promise<unknown>} Resultado do diálogo.
   */
  fileDialog: (): Promise<unknown> => ipcRenderer.invoke("file-dialog"),
  /**
   * Verificar se o token é JWT.
   * @returns {Promise<unknown>} Resultado da verificação.
   */
  isJwtToken: (): Promise<unknown> => ipcRenderer.invoke("is-jwt-token"),
  /**
   * Carregar preferências do usuário.
   * @returns {Promise<unknown>} Preferências carregadas.
   */
  loadPreferences: (): Promise<unknown> => ipcRenderer.invoke("load-preferences"),
  /**
   * Fechar a janela da aplicação.
   */
  closeWindow: (): void => ipcRenderer.send("close-window"),
  /**
   * Maximizar a janela da aplicação.
   */
  maximizeWindow: (): void => ipcRenderer.send("maximize-window"),
  /**
   * Minimizar a janela da aplicação.
   */
  minimizeWindow: (): void => ipcRenderer.send("minimize-window"),
};

/**
 * API para manipulação do tema escuro/claro.
 */
const themeApi = {
  /**
   * Alternar para modo escuro.
   * @returns {Promise<unknown>} Resultado da operação.
   */
  toggleDarkMode: (): Promise<unknown> => ipcRenderer.invoke("dark-mode:toggle-dark"),
  /**
   * Alternar para modo sistema.
   * @returns {Promise<unknown>} Resultado da operação.
   */
  toggleToSystem: (): Promise<unknown> => ipcRenderer.invoke("dark-mode:toggle-system"),
  /**
   * Alternar para modo claro.
   * @returns {Promise<unknown>} Resultado da operação.
   */
  toggleLightMode: (): Promise<unknown> => ipcRenderer.invoke("dark-mode:toggle-light"),
  /**
   * Obter o tema atual.
   * @returns {Promise<unknown>} Tema atual.
   */
  currentPreset: (): Promise<unknown> => ipcRenderer.invoke("dark-mode:current-preset"),
};

/**
 * API para autenticação de usuário.
 */
const authApi = {
  /**
   * Autenticar usuário com credenciais.
   * @param {string} username - Nome do usuário.
   * @param {string} password - Senha do usuário.
   * @returns {Promise<unknown>} Resultado da autenticação.
   */
  authenticateUser: (username: string, password: string): Promise<unknown> =>
    ipcRenderer.invoke("authenticate-user", username, password),
};

/**
 * API para operações relacionadas a bots.
 */
const botApi = {
  /**
   * Listar bots disponíveis.
   * @returns {Promise<unknown>} Lista de bots.
   */
  listagemBots: (): Promise<unknown> => ipcRenderer.invoke("listagem-bots"),
  /**
   * Listar credenciais de um sistema.
   * @param {SystemBots} sistema - Sistema alvo.
   * @returns {Promise<unknown>} Lista de credenciais.
   */
  listagemCredenciais: (sistema: SystemBots): Promise<unknown> =>
    ipcRenderer.invoke("listagem-credenciais", sistema),
};

/**
 * API para upload de arquivos.
 */
const storageApi = {
  /**
   * Enviar arquivos para o backend.
   * @param {File[]} files - Arquivos a serem enviados.
   * @returns {Promise<unknown>} Resultado do upload.
   */
  uploadFiles: (files: File[]): Promise<unknown> => ipcRenderer.invoke("upload-files", files),
};

contextBridge.exposeInMainWorld("windowApi", windowApi);
contextBridge.exposeInMainWorld("themeApi", themeApi);
contextBridge.exposeInMainWorld("authApi", authApi);
contextBridge.exposeInMainWorld("botApi", botApi);
contextBridge.exposeInMainWorld("storageApi", storageApi);

window.addEventListener("keypress", (e) => {
  if (e) {
    if (e.key === "F11") e.preventDefault();
    if (e.key === "F5") e.preventDefault();
  }
});
