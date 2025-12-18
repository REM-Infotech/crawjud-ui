import axios from "axios";

const _api = axios.create({
  baseURL: new URL(import.meta.env.VITE_API_URL).toString(),
  withCredentials: true,
  xsrfCookieName: "x-xsrf-token",
  xsrfHeaderName: "x-xsrf-token",
  withXSRFToken: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default _api;
