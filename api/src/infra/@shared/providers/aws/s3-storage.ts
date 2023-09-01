import { S3 } from 'aws-sdk'
import StorageProviderInterface, { ImageProps } from "../image-storage";

class S3StorageProvider implements StorageProviderInterface {
  private s3: S3

  constructor() {
    this.s3 = new S3({
      credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
      }
    })
  }
  
  async uploadImage(image: ImageProps): Promise<string> {
    const uploadedmage = await this.s3.upload({
      Bucket: process.env.PROFILE_BUCKET_NAME,
      Key: image.name,
      Body: image.file
    }).promise()

    return uploadedmage.Location
  }
}

export { S3StorageProvider }