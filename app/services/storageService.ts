import storage from "@/electron/utils/storage";
import { ipcMain, type IpcMainInvokeEvent } from "electron";
import { v4 as uuidv4 } from "uuid";

const { MINIO_BUCKET_NAME } = import.meta.env;

class StorageService {
  static async uploadFiles(files: File[]) {
    const seed = uuidv4().toString();

    for (const file of files) {
      const objectDest = `${seed}/${file.name}`;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await storage.putObject(MINIO_BUCKET_NAME, objectDest, buffer);
    }
  }
}

export default function useStorageService() {
  ipcMain.handle("upload-files", (_: IpcMainInvokeEvent, files: File[]) =>
    StorageService.uploadFiles(files),
  );
}
