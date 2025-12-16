import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import useSafeStorage from "./safeStoreService";

/**
 * Retornar instância Axios configurada com suporte a cookies persistentes.
 *
 * @returns {Promise<import("axios").AxiosInstance>} Instância Axios configurada.
 */
export default async function useApiService() {
  /**
   * Gerenciar autenticação e cookies para requisições HTTP.
   */
  class ApiService {
    /**
     * Armazenamento seguro para persistência de dados.
     *
     * @type {ISafeStoreService}
     * @public
     */
    safeStorage;

    /**
     * @type {import("tough-cookie").CookieJar}
     * @public
     */
    cookieJar;
    /**
     * Inicializar serviço e carregar armazenamento seguro.
     */

    /**
     * @type {import("axios").AxiosInstance}
     * @public
     */
    api;

    constructor() {
      this.safeStorage = useSafeStorage();
      this.cookieJar = this.loadCookieJar();
      this.setup().then((instance) => (this.api = instance));
    }

    /**
     * Carregar CookieJar do armazenamento seguro.
     *
     * @returns {CookieJar} CookieJar carregado ou novo.
     */
    loadCookieJar() {
      const cookieJarData = this.safeStorage.load(/** @type {string} */ "cookieJar");
      if (!cookieJarData) return new CookieJar();
      return CookieJar.fromJSON(cookieJarData);
    }

    /**
     * Salvar CookieJar no armazenamento seguro.
     *
     * @param {CookieJar} cookieJar - CookieJar a ser salvo.
     */
    saveCookieJar() {
      const json = JSON.stringify(this.cookieJar.toJSON());
      this.safeStorage.save({ key: "cookieJar", value: json });
    }

    /**
     * Configurar e retornar instância Axios com suporte a cookies.
     *
     * @returns {Promise<import("axios").AxiosInstance>} Instância Axios configurada.
     */
    async setup() {
      return wrapper(
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
      const cookieJar = this.api.defaults.jar; // ou ajuste conforme necessário

      /**
       * Pegue todos os cookies do CookieJar
       * @type {import("tough-cookie").Cookie[]} */
      const cookies = await new Promise((resolve, reject) => {
        cookieJar.getCookies(import.meta.env.VITE_API_URL, (err, cookies) => {
          if (err) reject(err);
          else resolve(cookies);
        });
      });

      // Insira cada cookie no Electron
      for (const cookie of cookies) {
        await session.defaultSession.cookies.set({
          url: import.meta.env.VITE_API_URL,
          name: cookie.key,
          value: cookie.value,
          domain: cookie.domain,
          path: cookie.path,
          secure: cookie.secure,
          httpOnly: cookie.httpOnly,
          expirationDate: cookie.expires,
        });
      }
    }
  }

  const serviceApi = new ApiService();
  /**
   * Interceptar respostas para salvar sempre o CookieJar atualizado.
   */
  if (serviceApi.api) {
    serviceApi.api.interceptors.response.use((response) => {
      serviceApi.saveCookieJar();
      return response;
    });
  }
  return serviceApi.api;
}
