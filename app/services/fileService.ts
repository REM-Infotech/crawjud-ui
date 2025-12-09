import { dialog, ipcMain } from "electron";
import { fileTypeFromBuffer } from "file-type";
import { readFileSync } from "fs";
import { homedir } from "os";
import { join, resolve } from "path";

const userHome = homedir();
class FileService {
  static async fileDialog() {
    const file = await dialog.showOpenDialog({
      title: "Selecione os arquivo",
      defaultPath: join(userHome),
      filters: [{ name: "Arquivos para o robô", extensions: ["xlsx", "pdf"] }],
    });

    const files = [];
    for (const filePath of file.filePaths) {
      const buffer = readFileSync(resolve(filePath));

      const fileName = filePath.split(/[\\/]/).pop() || "file";
      files.push({
        name: fileName,
        buffer: buffer,
        type: (await fileTypeFromBuffer(buffer))?.mime,
      });
    }

    return files;
  }
}

export default function useFileService() {
  ipcMain.handle("file-dialog", FileService.fileDialog);
}
