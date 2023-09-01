import UploadImageServiceInterface from "@application/@shared/services/upload-image.interface";
import StorageProviderInterface from "../providers/image-storage";

class UploadImage implements UploadImageServiceInterface {
  constructor(private imageStorageProvider: StorageProviderInterface) {}
  upload(image: Buffer): Promise<string> {
    throw new Error("Method not implemented.");
  }
}

export { UploadImage }