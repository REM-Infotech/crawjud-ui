import { dialog, session } from "electron";
import { writeFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";

const api = null;

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
            name: "Arquivo ZIP",
            extensions: ["zip", "rar", "7z", "tar", "gz", "bz2", "xz"],
          },
        ],
      });

      const cookies = await session.defaultSession.cookies.get({});
      api.defaults.headers.common["Cookie"] = cookies
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; ");

      const response = api.get<ResponseDownloadExecucao>(`/bot/execucoes/${pid}/download`);

      const content = (await response).data.content;
      const _fileName = (await response).data.file_name;
      const bytes_arquivo = Buffer.from(content, "base64");

      if (!savePath.canceled && savePath.filePath) {
        writeFileSync(savePath.filePath, bytes_arquivo);
        await dialog.showMessageBox({
          type: "info",
          title: "Download concluído",
          message: "O arquivo de execução foi baixado com sucesso.",
        });
      }
    } catch (error) {
      console.error("Erro ao baixar execução:", error);
      dialog.showErrorBox(
        "Erro ao baixar execução",
        "Ocorreu um erro ao baixar o arquivo de execução.",
      );
    }
  }
}

export default DeepFunctions;
