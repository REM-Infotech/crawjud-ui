import axios, { type AxiosInstance } from "axios";
import { wrapper } from "axios-cookiejar-support";
import type { CookieJar } from "tough-cookie";
import useCookieService from "./cookieService";

class ApiService {
  public api: AxiosInstance;
  CookieJar: CookieJar;

  constructor() {
    const { CookieService } = useCookieService();
    this.CookieJar = CookieService.cookieJar;
    this.api = undefined as unknown as AxiosInstance;
  }

  async setup(): Promise<AxiosInstance> {
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
        jar: this.CookieJar,
      }),
    );
    return this.api;
  }
}

export default async function useApiService() {
  const serviceApi = new ApiService();
  const api = await serviceApi.setup();

  return { api, serviceApi };
}
