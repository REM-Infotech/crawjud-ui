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
     * @type {ISafeStoreService}
     */
    safeStorage;

    /**
     * Inicializar serviço e carregar armazenamento seguro.
     */
    constructor() {
      this.safeStorage = useSafeStorage();
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
    saveCookieJar(cookieJar) {
      const json = JSON.stringify(cookieJar.toJSON());
      this.safeStorage.save({ key: "cookieJar", value: json });
    }

    /**
     * Configurar e retornar instância Axios com suporte a cookies.
     *
     * @returns {Promise<import("axios").AxiosInstance>} Instância Axios configurada.
     */
    async setup() {
      const cookieJar = this.loadCookieJar();
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
          jar: cookieJar,
        }),
      );
    }
  }
  return await new ApiService().setup();
}
