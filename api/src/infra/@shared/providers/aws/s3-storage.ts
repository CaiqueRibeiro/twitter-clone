import { S3 } from 'aws-sdk'
import Jimp from 'jimp'
import StorageProviderInterface, { ImageProps } from "../image-storage";

class S3StorageProvider implements StorageProviderInterface {
  private s3: S3

  constructor() {
    this.s3 = new S3({
      region: process.env.BUCKET_REGION,
      credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
      }
    })
  }
  
  async uploadImage(image: ImageProps): Promise<string> {
    const { name, file } = image

    const imageProcessing = await Jimp.read(file)
    const smallerImage = await imageProcessing.resize(Jimp.AUTO, 250).getBufferAsync(Jimp.MIME_JPEG)

    const uploadedmage = await this.s3.upload({
      Bucket: process.env.PROFILE_BUCKET_NAME,
      Key: name,
      ContentType: 'image/jpeg',
      Body: smallerImage,
    }).promise()

    return uploadedmage.Location
  }
}

export { S3StorageProvider }