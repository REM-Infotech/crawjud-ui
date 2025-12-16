import { dialog } from "electron";
import { writeFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";
import { default as useApiService } from "./apiService.mjs";

const homeUser = homedir();

class DeepFunctions {
  static functions: DeepLinkFunctions = {
    download_execucao: {
      need_args: true,
      function: DeepFunctions.download_execucao,
    },
  };

  static async download_execucao(pid: string) {
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
        const response = api.get<ResponseDownloadExecucao>(`/bot/execucoes/${pid}/download`);

        const content = (await response).data.content;
        const bytes_arquivo = Buffer.from(content, "base64");

        writeFileSync(savePath.filePath, bytes_arquivo);
        await dialog.showMessageBox({
          type: "info",
          title: "Download concluído",
          message: "Arquivo salvo com sucesso!",
        });
      }
    } catch (error) {
      dialog.showErrorBox(
        "Erro ao baixar execução",
        "Ocorreu um erro ao baixar o arquivo de execução.",
      );
    }
  }
}

export default DeepFunctions;
