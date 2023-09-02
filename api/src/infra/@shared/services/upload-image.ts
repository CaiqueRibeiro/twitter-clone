import UploadImageServiceInterface, {
  UploadImageProps,
} from '@application/@shared/services/upload-image.interface'
import StorageProviderInterface from '../providers/image-storage'
import { inject, injectable } from 'tsyringe'
import { randomUUID } from 'crypto'

@injectable()
class UploadImageService implements UploadImageServiceInterface {
  constructor(
    @inject('StorageProviderInterface')
    private storageProvider: StorageProviderInterface,
  ) {}

  async upload(input: UploadImageProps): Promise<string> {
    const { image } = input

    const imageName = `avatar-${randomUUID()}.jpg`

    const imageLink = await this.storageProvider.uploadImage({
      name: imageName,
      file: image,
    })

    return imageLink
  }
}

export { UploadImageService }
