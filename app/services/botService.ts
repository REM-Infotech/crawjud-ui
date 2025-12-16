/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosInstance } from "axios";
import { dialog, ipcMain } from "electron";
import { writeFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";
import useApiService from "./apiService";

const homeUser = homedir();

export default async function useBotService() {
  class BotService {
    public api: AxiosInstance;
    constructor() {
      this.api = undefined as unknown as AxiosInstance;
    }

    async iniciaExecucao(form: Record<string, any>, bot: CrawJudBot): Promise<boolean> {
      const endpoint = `/bot/${bot.sistema.toLowerCase()}/run`;

      try {
        const response = await this.api.post<StartBotPayload>(endpoint, form);
        return response.status === 200;
      } catch {
        return false;
      }
    }
    async download_execucao(pid: string): Promise<void> {
      try {
        const savePath = await dialog.showSaveDialog({
          title: "Salvar arquivo de execução",
          defaultPath: join(homeUser, `${pid}.zip`),
          filters: [
            {
              name: "Arquivo de execução",
              extensions: ["zip"],
            },
          ],
        });

        if (!savePath.canceled && savePath.filePath) {
          const endpoint = `/bot/execucoes/${pid}/download`;
          const response = await this.api.get<ResponseDownloadExecucao>(endpoint);
          const bytes_arquivo = Buffer.from(response.data.content, "base64");

          writeFileSync(savePath.filePath, bytes_arquivo);

          await dialog.showMessageBox({
            type: "info",
            title: "Download concluído",
            message: "Arquivo salvo com sucesso!",
          });
        }
      } catch {
        dialog.showErrorBox(
          "Erro ao baixar execução",
          "Ocorreu um erro ao baixar o arquivo de execução.",
        );
      }
    }
  }

  const botService = new BotService();
  botService.api = (await useApiService()).api;

  ipcMain.handle("bot-service:download-execucao", (_, pid) => botService.download_execucao(pid));
}
