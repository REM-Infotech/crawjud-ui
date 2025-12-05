import { ipcMain, type IpcMainInvokeEvent } from "electron";

class AuthService {
  static async authenticateUser(
    _: IpcMainInvokeEvent,
    username: string,
    password: string,
  ): Promise<boolean> {
    // Implement authentication logic here
    const response = await fetch(new URL("/auth/login", import.meta.env.VITE_API_URL), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    return response.ok;
  }
}

export default function useAuthService() {
  ipcMain.handle("authenticate-user", AuthService.authenticateUser);
}
