// Tipos auxiliares
type FileUpload = {
  name: string;
  buffer: Uint8Array;
  type: string;
};

class FileIpc {
  name: string;
  base64: string;
}

interface FileInStorage {
  name: string;
  seed: string;
}

interface FileUploadStorage {
  name: string;
  pathFile: string;
}

interface WindowApi {
  fileDialog: () => Promise<FileInStorage[]>;
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
  isJwtToken: () => Promise<boolean>;
}

interface BotApi {
  listagemBots: () => Promise<BotInfo[]>;
  listagemCredenciais: (sistema: SystemBots) => Promise<CredenciaisSelect[]>;
  iniciaExecucao: (form: FormBot, bot: BotInfo) => Promise<boolean>;
}

interface StorageApi {
  uploadFiles: (files: File[]) => Promise<unknown>;
}
