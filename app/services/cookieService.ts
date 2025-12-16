/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cookie, CookieJar } from "tough-cookie";

class localSafeStorageHandler {
  static async load(key: string) {
    if (typeof window !== "undefined" && window.safeStorageApi) {
      return await window.safeStorageApi.load(key);
    }
    if (typeof global !== "undefined" && (global as any).safeStorageApi) {
      console.log(global);
      return await (global as any).safeStorageApi.load(key);
    }
    return;
  }
  static async save(args: { key: string; value: string }) {
    if (window) await window.safeStorageApi.save(args);
  }
}

class cookieService {
  constructor() {}

  async saveCookieJar() {
    const json = JSON.stringify((await this.loadCookieJar()).toJSON());
    await localSafeStorageHandler.save({ key: "cookieJar", value: json });
  }

  async loadCookieJar(): Promise<CookieJar> {
    const cookieJarData = await localSafeStorageHandler.load(/** @type {string} */ "cookieJar");
    if (!cookieJarData) return new CookieJar();
    return CookieJar.fromJSON(cookieJarData);
  }

  async loadCookies() {
    const cookieJar = await this.loadCookieJar();
    const cookies: Cookie[] = await new Promise((resolve, reject) => {
      cookieJar.getCookies(import.meta.env.VITE_API_URL, (err, cookies) => {
        if (err) reject(err);
        else resolve(cookies as Cookie[]);
      });
    });

    const cookieSet: cookieApp[] = [];

    for (const cookie of cookies) {
      const expires: number | undefined =
        cookie.expires === "Infinity"
          ? undefined
          : cookie.expires instanceof Date
            ? cookie.expires.getTime()
            : undefined;

      cookieSet.push({
        url: new URL("/", import.meta.env.VITE_API_URL).toString(),
        name: cookie.key,
        value: cookie.value,
        domain: cookie.cdomain() as string,
        path: cookie.path as string,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
        expirationDate: expires,
      });
    }
  }
}

export default function useCookieService() {
  const CookieService = new cookieService();
  return { CookieService };
}
