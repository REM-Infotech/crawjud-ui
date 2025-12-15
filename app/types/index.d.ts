type str = string;
type int = number;
type Numberish = string | number;

interface Window {
  jQuery: typeof jQuery;
  $: typeof jQuery;
  matchMedia: typeof window.matchMedia;
  windowApi: WindowApi;
  themeApi: ThemeApi;
  authApi: AuthApi;
  botApi: BotApi;
  storageApi: StorageApi;
  botService: botService;
}

interface AuthPayload {
  message: string;
}

type elementRef = Ref<Element | ComponentPublicInstance | null>;
