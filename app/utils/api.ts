import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import * as tough from "tough-cookie";

const cookieJar = new tough.CookieJar();

const _api = wrapper(
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

export default _api;
