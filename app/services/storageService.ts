import { fileTypeFromFile } from "file-type";
import { Client } from "minio";
import { resolve } from "path";
import { v4 as uuidv4 } from "uuid";

const storage = new Client({
  endPoint: import.meta.env.VITE_MINIO_ENDPOINT as string,
  port: Number(import.meta.env.VITE_MINIO_PORT),
  useSSL: false,
  accessKey: import.meta.env.VITE_MINIO_ACCESS_KEY,
  secretKey: import.meta.env.VITE_MINIO_SECRET_KEY,
});

class StorageService {
  static async uploadFiles(files: FileUploadStorage[]) {
    const bucket = import.meta.env.VITE_MINIO_BUCKET_NAME as string;
    const seed = uuidv4().toString();

    const returnFiles: FileInStorage[] = [];
    for (const file of files) {
      const objectDest = `/${seed}/${file.name}`.replace(/\\/g, "/");
      const filePath = resolve(file.pathFile);
      const fileType = (await fileTypeFromFile(filePath))?.mime as string;
      const uploadedInfo = await storage.fPutObject(bucket, objectDest, filePath);
      if (uploadedInfo) returnFiles.push(...[{ name: file.name, seed: seed, type: fileType }]);
    }
    return returnFiles;
  }
}

export default StorageService;
