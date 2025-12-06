import api from "@/electron/utils/api";
import type { AxiosResponse } from "axios";
import { ipcMain, type IpcMainInvokeEvent } from "electron";
import safeStoreService from "./safeStoreService";
class AuthService {
  static async authenticateUser(
    _: IpcMainInvokeEvent,
    username: string,
    password: string,
  ): Promise<boolean> {
    // Implement authentication logic here

    let response: AxiosResponse<AuthResponse> | null = null;
    try {
      response = await api.post("/auth/login", {
        username: username,
        password: password,
      });

      const authToken = `Bearer ${response?.data.access_token}`;
      api.defaults.headers["Autorization"] = authToken;
      safeStoreService.save({ key: "jwt", value: authToken });
    } catch {
      //
    }

    return response ? response.status === 200 : false;
  }
}

export default function useAuthService() {
  ipcMain.handle("authenticate-user", AuthService.authenticateUser);
}
