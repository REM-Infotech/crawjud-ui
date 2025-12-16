import axios, { type AxiosInstance } from "axios";
import { wrapper } from "axios-cookiejar-support";
import type { CookieJar } from "tough-cookie";
import useCookieService from "./cookieService";

class ApiService {
  public api: AxiosInstance;
  loadCookieJar: () => Promise<CookieJar>;
  saveCookieJar: () => Promise<void>;

  constructor() {
    const { CookieService } = useCookieService();
    this.loadCookieJar = CookieService.loadCookieJar;
    this.saveCookieJar = CookieService.saveCookieJar;
    this.api = undefined as unknown as AxiosInstance;
  }

  async setup(): Promise<AxiosInstance> {
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
        jar: await this.loadCookieJar(),
      }),
    );
  }
}

export default async function useApiService() {
  const serviceApi = new ApiService();
  serviceApi.api = await serviceApi.setup();
  const api = serviceApi.api;

  serviceApi.api.interceptors.response.use(async (response) => {
    await serviceApi.saveCookieJar();
    return response;
  });

  return { api, serviceApi };
}
