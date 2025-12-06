import axios from "axios";
import { Agent as HttpAgent } from "http";
import { Agent as HttpsAgent } from "https";

export default axios.create({
  baseURL: new URL(import.meta.env.VITE_API_URL).toString(),
  withCredentials: true,
  xsrfCookieName: "x-xsrf-token",
  xsrfHeaderName: "x-xsrf-token",
  withXSRFToken: true,
  headers: {
    "Content-Type": "application/json",
  },
  httpAgent: new HttpAgent({ keepAlive: true }),
  httpsAgent: new HttpsAgent({ keepAlive: true }),
});
