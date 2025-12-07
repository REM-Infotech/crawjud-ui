type DeepFunctionNames = "download_execucao";
type MessageType = "success" | "info" | "error" | "warning";
type NotificationDirection = "auto" | "ltr" | "rtl";
type KeywordArgs = {
  title: string;
  message: string;
  type: MessageType;
  duration: number;
};

interface Window {
  jQuery: typeof jQuery;
  $: typeof jQuery;
  axios: typeof AxiosInstance;
  matchMedia: typeof window.matchMedia;
  electronAPI: electronAPI;
}

interface electronAPI {
  loadPreferences: () => Promise<void>;
  listagemBots: () => Promise<BotInfo[]>;
  authenticateUser: (username: string, password: string) => Promise<boolean>;
  closeWindow: () => Promise<void>;
  maximizeWindow: () => Promise<void>;
  minimizeWindow: () => Promise<void>;
  getColorMode: () => Promise<"light" | "dark">;
}

interface toastOptions {
  title?: string;
  message: string;
  type: MessageType;
  timeout: number;
}

interface ImportMetaEnv {
  VITE_API_URL: string;
  VITE_BETA_TEST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Element {
  focus(): void;
}

interface NotificationOptions {
  badge?: string;
  body?: string;
  data?: unknown;
  dir?: NotificationDirection;
  icon?: string;
  lang?: string;
  requireInteraction?: boolean;
  silent?: boolean | null;
  tag?: string;
}

declare global {
  interface Window {
    electronAPI: electronAPI;
  }
}

interface FormLogin {
  login: string;
  password: string;
  remember: boolean;
}

interface ResponseDownloadExecucao {
  content: string;
  file_name: string;
}

interface DeepLinkFunctions extends Record<DeepFunctionNames, any> {
  download_execucao: {
    need_args: boolean;
    function: (...args: any[]) => Promise<void> | void;
  };
}

interface DtColumns<T = any> {
  data: keyof T | string;
  title: string;
  type?: string;
}

interface ColumnProps<T = any> {
  cellData: any;
  rowData: Record<T, string | number>;
  rowIndex: number;
  type: T extends { type: infer U } ? U : string;
}

declare module "@/pages/logs/Contador.json" {
  const contador: ValoresContador;
  export default contador;
}

declare module "@/pages/logs/LogCache.json" {
  const LogCache: Message[];
  export default LogCache;
}
