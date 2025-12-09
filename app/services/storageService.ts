import { storage } from "@/electron/main";
import { v4 as uuidv4 } from "uuid";

class StorageService {
  static async uploadFiles(files: File[]) {
    const seed = uuidv4().toString();

    for (const file of files) {
      const objectDest = `${seed}/${file.name}`;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await storage.putObject(import.meta.env.MINIO_BUCKET_NAME, objectDest, buffer);
    }
    return seed;
  }
}

export default StorageService;
