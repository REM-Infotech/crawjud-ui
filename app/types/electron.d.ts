// Tipos auxiliares
type FileUpload = {
  name: string;
  buffer: Uint8Array;
  type: string;
};

interface WindowApi {
  fileDialog: () => Promise<FileUpload[]>;
  isJwtToken: () => Promise<boolean>;
  loadPreferences: () => Promise<unknown>;
  closeWindow: () => void;
  maximizeWindow: () => void;
  minimizeWindow: () => void;
}

interface ThemeApi {
  toggleDarkMode: () => Promise<void>;
  toggleToSystem: () => Promise<void>;
  toggleLightMode: () => Promise<void>;
  currentPreset: () => Promise<Theme>;
}

interface AuthApi {
  authenticateUser: (username: string, password: string) => Promise<unknown>;
}

interface BotApi {
  listagemBots: () => Promise<BotInfo[]>;
  listagemCredenciais: (sistema: SystemBots) => Promise<CredenciaisSelect[]>;
}

interface StorageApi {
  uploadFiles: (files: File[]) => Promise<unknown>;
}
