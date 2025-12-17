import { Cookie, CookieJar } from "tough-cookie";

class localSafeStorageHandler {
  static async loadContext() {
    if (typeof window !== "undefined" && window.safeStorageApi) {
      return window;
    }

    const safeService = (await import("./safeStoreService")).default();
    return { safeStorageApi: safeService };
  }

  static async load(key: string) {
    const context = await localSafeStorageHandler.loadContext();
    if (!context) return;
    return await context.safeStorageApi.load(key);
  }
  static async save(args: { key: string; value: string }) {
    const context = await localSafeStorageHandler.loadContext();
    if (!context) return;
    await context.safeStorageApi.save(args);
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

    try {
      const { api } = await (await import("@/services/apiService")).default();
      const response = await api.get("/sessao-valida");
      return response.status === 200 ? cookieSet : [];
    } catch {
      return [];
    }
  }
}

export default function useCookieService() {
  const CookieService = new cookieService();
  return { CookieService };
}
