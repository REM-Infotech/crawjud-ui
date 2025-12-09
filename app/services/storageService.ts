import { storage } from "@/electron/main";
import { resolve } from "path";
import { v4 as uuidv4 } from "uuid";

class StorageService {
  static async uploadFiles(files: FileUploadStorage[]) {
    const bucket = import.meta.env.VITE_MINIO_BUCKET_NAME as string;
    const seed = uuidv4().toString();

    const returnFiles: FileInStorage[] = [];
    for (const file of files) {
      const objectDest = `/${seed}/${file.name}`.replace(/\\/g, "/");
      const filePath = resolve(file.pathFile);
      const uploadedInfo = await storage.fPutObject(bucket, objectDest, filePath);
      if (uploadedInfo) returnFiles.push(...[{ name: file.name, seed: seed }]);
    }
    return returnFiles;
  }
}

export default StorageService;
