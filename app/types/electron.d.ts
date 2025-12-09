// ... Tipos e interfaces do Electron e APIs globais

/**
 * Interface para API Electron exposta no window.
 */
interface electronAPI {
  isJwtToken: () => Promise<boolean>;
  authenticateUser: (username: string, password: string) => Promise<boolean>;
  loadPreferences: () => Promise<void>;
  fileDialog: () => Promise<
    [
      {
        name: string;
        buffer: Uint8Array;
        type: string;
      },
    ]
  >;
  closeWindow: () => Promise<void>;
  maximizeWindow: () => Promise<void>;
  minimizeWindow: () => Promise<void>;
  toggleDarkMode: () => Promise<void>;
  toggleToSystem: () => Promise<void>;
  toggleLightMode: () => Promise<void>;
  currentPreset: () => Promise<import("./theme").Theme>;
}

/**
 * Interface para API de bots.
 */
interface botApi {
  listagemBots: () => Promise<BotInfo[]>;
  listagemCredenciais: (sistema: SystemBots) => Promise<CredenciaisSelect[]>;
}

/**
 * Extensão do objeto Window global.
 */
interface Window {
  jQuery: typeof jQuery;
  $: typeof jQuery;
  axios: typeof AxiosInstance;
  matchMedia: typeof window.matchMedia;
  electronAPI: electronAPI;
  botApi: botApi;
}
