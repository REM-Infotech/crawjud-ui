/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosInstance } from "axios";
import { ipcMain, type IpcMainInvokeEvent as IpcInvoke } from "electron";
import useApiService from "./apiService.mjs";

export default function useAuthService() {
  class AuthService {
    public api: AxiosInstance;
    constructor() {
      this.api = undefined as unknown as AxiosInstance;
      useApiService().then((instance) => {
        this.api = instance;
      });
    }

    async autenticarSessao(form: Record<string, any>): AuthReturn {
      try {
        return (await this.api.post<AuthenticationPayload>("/auth/login", form)).data;
      } catch {}
      return;
    }
  }

  const authService = new AuthService();

  ipcMain.handle("crawjud:autenticar", (_: IpcInvoke, data: Record<string, any>) =>
    authService.autenticarSessao(data),
  );
}
