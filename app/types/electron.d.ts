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
  type: string;
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

interface botService {
  downloadExecucao: (pid: str) => Promise<void>;
}
