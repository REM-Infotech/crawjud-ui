/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosInstance } from "axios";
import { ipcMain, type IpcMainInvokeEvent as IpcInvoke } from "electron";
import useApiService from "./apiService.js";

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
        const data = (await this.api.post<AuthenticationPayload>("/auth/login", form)).data;
        return {
          mensagem: data.message,
          status: "sucesso",
        };
      } catch (err) {
        console.log(err);
        return {
          mensagem: "Erro ao realizar autenticação",
          status: "erro",
        };
      }
    }
  }

  const authService = new AuthService();

  ipcMain.handle("crawjud:autenticar", (_: IpcInvoke, data: Record<string, any>) =>
    authService.autenticarSessao(data),
  );
}
