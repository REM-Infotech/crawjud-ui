// Tipos auxiliares
type FileUpload = {
  name: string;
  buffer: Uint8Array;
  type: string;
};

/**
 * API para operações de janela e preferências.
 */
interface WindowApi {
  /**
   * Abrir diálogo de arquivos.
   * @returns {Promise<FileUpload[]>} Resultado do diálogo.
   */
  fileDialog: () => Promise<FileUpload[]>;
  /**
   * Verificar se o token é JWT.
   * @returns {Promise<boolean>} Resultado da verificação.
   */
  isJwtToken: () => Promise<boolean>;
  /**
   * Carregar preferências do usuário.
   * @returns {Promise<unknown>} Preferências carregadas.
   */
  loadPreferences: () => Promise<unknown>;
  /**
   * Fechar a janela da aplicação.
   */
  closeWindow: () => void;
  /**
   * Maximizar a janela da aplicação.
   */
  maximizeWindow: () => void;
  /**
   * Minimizar a janela da aplicação.
   */
  minimizeWindow: () => void;
}

/**
 * API para manipulação do tema escuro/claro.
 */
interface ThemeApi {
  /**
   * Alternar para modo escuro.
   * @returns {Promise<void>} Resultado da operação.
   */
  toggleDarkMode: () => Promise<void>;
  /**
   * Alternar para modo sistema.
   * @returns {Promise<void>} Resultado da operação.
   */
  toggleToSystem: () => Promise<void>;
  /**
   * Alternar para modo claro.
   * @returns {Promise<void>} Resultado da operação.
   */
  toggleLightMode: () => Promise<void>;
  /**
   * Obter o tema atual.
   * @returns {Promise<import("./theme").Theme>} Tema atual.
   */
  currentPreset: () => Promise<Theme>;
}

/**
 * API para autenticação de usuário.
 */
interface AuthApi {
  /**
   * Autenticar usuário com credenciais.
   * @param {string} username - Nome do usuário.
   * @param {string} password - Senha do usuário.
   * @returns {Promise<unknown>} Resultado da autenticação.
   */
  authenticateUser: (username: string, password: string) => Promise<unknown>;
}

/**
 * API para operações relacionadas a bots.
 */
interface BotApi {
  /**
   * Listar bots disponíveis.
   * @returns {Promise<BotInfo[]>} Lista de bots.
   */
  listagemBots: () => Promise<BotInfo[]>;
  /**
   * Listar credenciais de um sistema.
   * @param {SystemBots} sistema - Sistema alvo.
   * @returns {Promise<CredenciaisSelect[]>} Lista de credenciais.
   */
  listagemCredenciais: (sistema: SystemBots) => Promise<CredenciaisSelect[]>;
}

/**
 * API para upload de arquivos.
 */
interface StorageApi {
  /**
   * Enviar arquivos para o backend.
   * @param {File[]} files - Arquivos a serem enviados.
   * @returns {Promise<unknown>} Resultado do upload.
   */
  uploadFiles: (files: File[]) => Promise<unknown>;
}

/**
 * Extensão do objeto Window global.
 */
interface Window {
  jQuery: typeof jQuery;
  $: typeof jQuery;
  axios: typeof AxiosInstance;
  matchMedia: typeof window.matchMedia;
  windowApi: WindowApi;
  themeApi: ThemeApi;
  authApi: AuthApi;
  botApi: BotApi;
  storageApi: StorageApi;
}
