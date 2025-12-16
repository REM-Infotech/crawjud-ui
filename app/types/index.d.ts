type str = string;
type int = number;
type Numberish = string | number;

interface Window {
  jQuery: typeof jQuery;
  $: typeof jQuery;
  matchMedia: typeof window.matchMedia;
  windowApi: WindowApi;
  themeApi: ThemeApi;
  authService: authService;
  botApi: BotApi;
  storageApi: StorageApi;
  botService: botService;
}

interface AuthPayload {
  message: string;
}

interface AuthResult {
  mensagem: string;
  status: "sucesso" | "erro";
}

type AuthReturn = Promise<AuthResult>;
type elementRef = Ref<Element | ComponentPublicInstance | null>;

declare module "~/assets/img/dark/elaw.png" {
  const logoElaw: string;
  export default logoElaw;
}

declare module "~/assets/img/dark/esaj.png" {
  const logoEsaj: string;
  export default logoEsaj;
}

declare module "~/assets/img/dark/esaj.png" {
  const logoEsaj: string;
  export default logoEsaj;
}

declare module "~/assets/img/light/projudi.png" {
  const logoProjudi: string;
  export default logoProjudi;
}

declare module "~/assets/img/dark/pje.png" {
  const logoPJe: string;
  export default logoPJe;
}

declare module "~/assets/img/light/crawjud.png" {
  const logoCrawJUD: string;
  export default logoCrawJUD;
}
