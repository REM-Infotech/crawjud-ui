import { dialog, ipcMain } from "electron";
import { homedir } from "os";
import { join } from "path";
import StorageService from "./storageService";

const userHome = homedir();
class FileService {
  static async fileDialog() {
    const file = await dialog.showOpenDialog({
      properties: ["multiSelections", "dontAddToRecent"],
      title: "Selecione os arquivo",
      defaultPath: join(userHome),
      filters: [{ name: "Arquivos para o robô", extensions: ["xlsx", "pdf"] }],
    });

    const files = [];
    for (const filePath of file.filePaths) {
      const fileName = filePath.split(/[\\/]/).pop() || "file";
      files.push({
        name: fileName,
        pathFile: filePath,
      });
    }

    return await StorageService.uploadFiles(files);
  }
}

export default function useFileService() {
  ipcMain.handle("file-dialog", FileService.fileDialog);
}
