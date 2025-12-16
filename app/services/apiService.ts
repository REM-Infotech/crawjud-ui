import axios, { type AxiosInstance } from "axios";
import { wrapper } from "axios-cookiejar-support";
import { session } from "electron";
import { Cookie, CookieJar } from "tough-cookie";
import useSafeStorage from "./safeStoreService";

/**
 * Retornar instância Axios configurada com suporte a cookies persistentes.
 *
 * @returns {Promise<import("axios").AxiosInstance>} Instância Axios configurada.
 */
export default async function useApiService(): Promise<import("axios").AxiosInstance> {
  /**
   * Gerenciar autenticação e cookies para requisições HTTP.
   */
  class ApiService {
    public safeStorage: ISafeStoreService;
    public cookieJar: import("tough-cookie").CookieJar;
    public api: import("axios").AxiosInstance | undefined;

    constructor() {
      this.safeStorage = useSafeStorage();
      this.cookieJar = this.loadCookieJar();
    }

    loadCookieJar(): CookieJar {
      const cookieJarData = this.safeStorage.load(/** @type {string} */ "cookieJar");
      if (!cookieJarData) return new CookieJar();
      return CookieJar.fromJSON(cookieJarData);
    }
    saveCookieJar() {
      const json = JSON.stringify(this.cookieJar.toJSON());
      this.safeStorage.save({ key: "cookieJar", value: json });
    }

    async setup(): Promise<void> {
      this.api = wrapper(
        axios.create({
          baseURL: new URL(import.meta.env.VITE_API_URL).toString(),
          withCredentials: true,
          xsrfCookieName: "x-xsrf-token",
          xsrfHeaderName: "x-xsrf-token",
          withXSRFToken: true,
          headers: {
            "Content-Type": "application/json",
          },
          jar: this.cookieJar,
        }),
      );
    }

    async injectCookiesToElectron() {
      /**
       * Acesse o cookieJar conforme sua implementação
       *  @type {CookieJar} */
      const cookieJar: CookieJar = this.api?.defaults.jar as CookieJar; // ou ajuste conforme necessário

      const cookies: import("tough-cookie").Cookie[] = await new Promise((resolve, reject) => {
        cookieJar.getCookies(import.meta.env.VITE_API_URL, (err, cookies) => {
          if (err) reject(err);
          else resolve(cookies as Cookie[]);
        });
      });

      // Insira cada cookie no Electron
      for (const cookie of cookies) {
        let expires: number | undefined = undefined;
        if (cookie.expires === "Infinity") {
          expires = undefined;
        } else if (cookie.expires instanceof Date) {
          expires = cookie.expires.getTime();
        }

        try {
          await session.defaultSession.cookies.set({
            url: import.meta.env.VITE_API_URL,
            name: cookie.key,
            value: cookie.value,
            domain: cookie.domain as string,
            path: cookie.path as string,
            secure: cookie.secure,
            httpOnly: cookie.httpOnly,
            expirationDate: expires,
          });
        } catch (err) {
          console.log(err, cookie);
        }
      }
    }
  }

  const serviceApi = new ApiService();
  await serviceApi.setup();
  /**
   * Interceptar respostas para salvar sempre o CookieJar atualizado.
   */
  if (serviceApi.api) {
    serviceApi.api.interceptors.response.use(async (response) => {
      serviceApi.saveCookieJar();
      await serviceApi.injectCookiesToElectron();
      return response;
    });
  }
  return serviceApi.api as AxiosInstance;
}
