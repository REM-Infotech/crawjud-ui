import api from "@/electron/utils/api";
import { ipcMain, type IpcMainInvokeEvent } from "electron";
import safeStoreService from "./safeStoreService";

class BotService {
  static async listagemBots(_: IpcMainInvokeEvent) {
    async function requisitarApi() {
      try {
        const token = safeStoreService.load("jwt");

        const url = new URL("/bot/listagem", import.meta.env.VITE_API_URL);
        const response = await api.get<BotPayload>(url.toString(), {
          headers: {
            Authorization: token,
          },
        });

        safeStoreService.save({ key: "bots", value: JSON.stringify(response.data.listagem) });

        return response.data.listagem;
      } catch {
        return [];
      }
    }

    const requisitar = requisitarApi();
    const listagem = JSON.parse(safeStoreService.load("bots") || "[]");

    if (!listagem) {
      return await requisitar;
    }
    return listagem;
  }
}

export default function useBotService() {
  ipcMain.handle("listagem-bots", BotService.listagemBots);
}
