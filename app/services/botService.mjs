import { dialog, ipcMain } from "electron";
import useApiService from "./apiService.mjs";

export default function useBotService() {
  class BotService {
    constructor() {
      useApiService().then((instance) => {
        this.api = instance;
      });
    }
    /**
     *
     * Inicia a execução do robô
     * @param {Record<string, any>} form
     * @param {CrawJudBot} bot
     * @returns {Promise<boolean>} Boleano para indicar se a execução iniciou
     *
     */
    async iniciaExecucao(form, bot) {
      /** @type {import("axios").AxiosResponse<StartBotPayload>} */
      let response = { status: 500 };
      const endpoint = `/bot/${bot.sistema.toLowerCase()}/run`;

      try {
        response = this.api.post(endpoint, form);
      } catch {}
      return response.status === 200;
    }
    /**
     * Baixa os arquivos de execução do robô
     * @param {string} pid: ID de execução do robô
     * @returns {Promise<void>}
     */
    async download_execucao(pid) {
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
          const api = await useApiService();

          /**
           * @type {import("axios").AxiosResponse<ResponseDownloadExecucao>}
           */
          const response = await api.get(`/bot/execucoes/${pid}/download`);

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
  ipcMain.handle("bot-service:download-execucao", (_, pid) => botService.download_execucao(pid));
}
