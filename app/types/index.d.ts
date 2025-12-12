type str = string;
type int = number;

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

interface AuthPayload {
  message: string;
}

type elementRef = Ref<Element | ComponentPublicInstance | null>;
