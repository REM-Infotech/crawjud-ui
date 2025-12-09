import api from "@/electron/utils/api";
import { ipcMain, type IpcMainInvokeEvent } from "electron";
import safeStoreService from "./safeStoreService";

class FileIpc {
  readonly name: string;
  readonly base64: string;

  constructor(name: string, base64: string) {
    this.name = name;
    this.base64 = base64;
  }
}

class BotService {
  static async requisitarApi<T = any>(endpoint: string): Promise<T> {
    try {
      const token = safeStoreService.load("jwt");
      const url = new URL(endpoint, import.meta.env.VITE_API_URL);
      const response = await api.get(url.toString(), {
        headers: {
          Authorization: token,
        },
      });

      return response.data;
    } catch {
      return null as unknown as T;
    }
  }
  static async listagemBots(_: IpcMainInvokeEvent) {
    const listagem: BotInfo[] = JSON.parse(safeStoreService.load("bots") || "[]");
    if (listagem.length === 0) {
      const requisitar = await BotService.requisitarApi<BotPayload>("/bot/listagem");
      if (!requisitar) return [];
      safeStoreService.save({ key: "bots", value: JSON.stringify(requisitar.listagem) });
      return requisitar.listagem;
    }
    return listagem;
  }

  static async listagemCredenciais(sistema: SystemBots) {
    const listagem: CredenciaisSelect[] = JSON.parse(
      safeStoreService.load(`cred-${sistema}`) || "[]",
    );
    if (listagem.length === 0) {
      const endpoint = `/bot/${sistema.toLowerCase()}/credenciais`;
      const requisitar = await BotService.requisitarApi<CredenciaisPayload>(endpoint);
      if (!requisitar) return [];

      const credenciais = requisitar.credenciais;
      safeStoreService.save({ key: `cred-${sistema}`, value: JSON.stringify(credenciais) });
      return credenciais;
    }
    return listagem;
  }
  static async iniciaExecucao(form: Record<string, any>, bot: BotInfo) {
    try {
      const endpoint = `/bot/${bot.sistema.toLowerCase()}/run`;
      const token = safeStoreService.load("jwt");
      await new Promise((resolve) => setTimeout(resolve, 500));

      form["configuracao_form"] = bot.configuracao_form;

      const xsrf = (
        await api.get("/bot/xsrf-cookie", {
          headers: {
            Authorization: token,
          },
        })
      ).data.csrf as string;
      const response = await api.post(endpoint, form, {
        headers: {
          Authorization: token,
          "x-xsrf-token": xsrf,
        },
      });

      if (response.status === 200) {
        return true;
      }
    } catch {}
    return false;
  }
}

export default function useBotService() {
  ipcMain.handle("listagem-bots", BotService.listagemBots);
  ipcMain.handle("listagem-credenciais", (_: IpcMainInvokeEvent, sistema: SystemBots) =>
    BotService.listagemCredenciais(sistema),
  );

  ipcMain.handle(
    "inicia-execucao",
    (_: IpcMainInvokeEvent, form: Record<string, any>, bot: BotInfo) =>
      BotService.iniciaExecucao(form, bot),
  );
}
