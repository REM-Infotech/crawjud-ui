import axios from "axios";
import { session } from "electron";

class apiService {
  static async setup() {
    const api = axios.create({
      baseURL: new URL(import.meta.env.VITE_API_URL).toString(),
      withCredentials: true,
      xsrfCookieName: "x-xsrf-token",
      xsrfHeaderName: "x-xsrf-token",
      withXSRFToken: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    api.defaults.headers.common["Cookie"] = (
      await session.defaultSession.cookies.get({
        url: import.meta.env.VITE_API_URL,
      })
    )
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    return api;
  }
}

export default apiService;
