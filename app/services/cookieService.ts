/* eslint-disable @typescript-eslint/no-explicit-any */

import { Cookie, CookieJar, Store, type Nullable } from "tough-cookie";

interface Callback<T> {
  (error?: Error, result?: never): void;
  (error?: null, result?: T): void;
}

function createPromiseCallback<T = unknown | null>(cb?: Callback<T>) {
  let callback;
  let resolve: (reason?: unknown) => void;
  let reject: (reason?: unknown) => void;
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  if (typeof cb === "function") {
    callback = (err: Error | null, result?: T) => {
      try {
        if (err) cb(err);
        else cb(null, result);
      } catch (e) {
        reject(e instanceof Error ? e : new Error());
      }
    };
  } else {
    callback = (err: Error | null, result?: T) => {
      try {
        if (err) reject(err);
        else resolve(result);
      } catch (e) {
        reject(e instanceof Error ? e : new Error());
      }
    };
  }
  return {
    promise,
    callback,
    resolve: (value: T) => {
      callback(null as unknown as Error & T, value);
      return promise;
    },
    reject: (error: Error | null) => {
      callback(error);
      return promise;
    },
  };
}

class localSafeStorageHandler {
  static async loadContext() {
    if (typeof window !== "undefined" && window.safeStorageApi) {
      return window;
    }

    const safeService = (await import("./safeStoreService")).default();
    return { safeStorageApi: safeService };
  }

  static load(key: string): Promise<string> {
    const { promise, callback } = createPromiseCallback();

    localSafeStorageHandler
      .loadContext()
      .then((ctx) => ctx.safeStorageApi.load(key))
      .then((result) => callback(null, result))
      .catch((err) => callback(err));

    return promise as Promise<string>;
  }

  static async save(args: { key: string; value: string }) {
    const context = await localSafeStorageHandler.loadContext();
    if (!context) return;
    await context.safeStorageApi.save(args);
  }
}

class SafeToughCookieStore extends Store {
  idx: any;
  constructor() {
    super();
    this.synchronous = true;
    this.idx = /* @__PURE__ */ Object.create(null);
  }

  override async putCookie(cookie: Cookie): Promise<void> {
    const Cookies = await this.getAllCookies();

    if (Cookies.length > 0) {
      const outdatedCookie = await this.findCookie(cookie.domain, cookie.path, cookie.key);
      if (outdatedCookie) {
        Cookies.splice(Cookies.indexOf(outdatedCookie), 1);
      }
      this._pushChanges(Cookies);
    }
  }

  override async findCookie(
    domain: Nullable<string>,
    path: Nullable<string>,
    key: Nullable<string>,
  ): Promise<Cookie | undefined> {
    const Cookies = ((await this.getAllCookies()) || []).filter((item) => {
      return [
        domain && item.domain === domain,
        key && item.key === key,
        path && item.path === path,
      ].some(Boolean);
    });

    return Cookies.length > 0 ? Cookies[0] : undefined;
  }

  override async findCookies(
    domain?: Nullable<string>,
    path?: Nullable<string>,
    allowSpecialUseDomain?: Nullable<boolean>,
  ): Promise<Cookie[]> {
    const Cookies = ((await this.getAllCookies()) || []).filter((item) => {
      return [
        domain &&
          (item.domain === domain || (allowSpecialUseDomain && item.domain?.includes(domain))),
        path && item.path === path,
      ].some(Boolean);
    });
    return Cookies.length > 0 ? Cookies : [];
  }

  override async updateCookie(oldCookie: Cookie, newCookie: Cookie): Promise<void> {
    const Cookies = await this.getAllCookies();

    if (Cookies.length > 0 && Cookies[Cookies.indexOf(oldCookie)]) {
      Cookies.splice(Cookies.indexOf(oldCookie), 1);
      Cookies.push(newCookie);

      this._pushChanges(Cookies);
    }
  }

  override async removeAllCookies(): Promise<void> {
    await localSafeStorageHandler.save({ key: "cookiesSafeJar", value: "[]" });
  }

  override async removeCookie(
    domain: Nullable<string>,
    path: Nullable<string>,
    key: Nullable<string>,
  ): Promise<void> {
    const cookie = await this.findCookie(domain, path, key);
    const Cookies = await this.getAllCookies();
    if (cookie && Cookies.length > 0) {
      const cookieIndex = Cookies.indexOf(cookie);

      if (cookieIndex !== -1) {
        Cookies.splice(cookieIndex, 1);
      }

      this._pushChanges(Cookies);
    }
  }
  override async getAllCookies(): Promise<Cookie[]> {
    const strCookies = (await localSafeStorageHandler.load("cookiesSafeJar")) || "[]";

    const cookies = Array.from(JSON.parse(strCookies)).map(
      (item) => Cookie.fromJSON(item) as Cookie,
    );

    return cookies.length > 0 ? cookies : [];
  }

  private async _pushChanges(Cookies: Cookie[]) {
    const serializedCookies = Array.from(Cookies).map((item) => item?.toJSON());
    await localSafeStorageHandler.save({
      key: "cookiesSafeJar",
      value: JSON.stringify(serializedCookies),
    });
  }
}

class cookieService {
  cookieJar: CookieJar;
  store: SafeToughCookieStore;
  constructor() {
    this.store = new SafeToughCookieStore();
    this.cookieJar = new CookieJar(this.store);
  }

  async loadCookies() {
    const cookies: Cookie[] = await this.store.getAllCookies();
    this.cookieJar = CookieJar.fromJSON(JSON.parse(cookies.map((cookie) => cookie.toJSON())));

    const cookieSet: cookieApp[] = [];
    console.log(cookieSet);
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
