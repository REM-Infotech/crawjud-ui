import apiService from "@/services/apiService";
import DeepFunctions from "@/services/deepService";
import { ipcMain, type IpcMainInvokeEvent } from "electron";

export default function useBotService() {
  class BotService {
    static async iniciaExecucao(form: Record<string, any>, bot: BotInfo) {
      try {
        const api = await apiService.setup();
        const endpoint = `/bot/${bot.sistema.toLowerCase()}/run`;
        const response = await api.post(endpoint, form);
        if (response.status === 200) {
          return true;
        }
      } catch {}
      return false;
    }
    static async download_execucao(_: IpcMainInvokeEvent, pid: string) {
      return await DeepFunctions.download_execucao(pid);
    }
  }

  ipcMain.handle("execucao-bot:download-execucao", BotService.download_execucao);
}
