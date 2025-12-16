/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosInstance } from "axios";
import useApiService from "./apiService.js";

export default async function useAuthService() {
  class AuthService {
    public api: AxiosInstance;
    constructor() {
      this.api = undefined as unknown as AxiosInstance;
    }

    async autenticarSessao(form: Record<string, any>): AuthReturn {
      try {
        const data = (await this.api.post<AuthenticationPayload>("/auth/login", form)).data;
        return {
          mensagem: data.message,
          status: "sucesso",
        };
      } catch {
        return {
          mensagem: "Erro ao realizar autenticação",
          status: "erro",
        };
      }
    }
  }

  const authService = new AuthService();
  authService.api = (await useApiService()).api;

  return authService;
}
