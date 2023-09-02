import UploadImageServiceInterface from "@application/@shared/services/upload-image.interface"
import { injectable, inject } from "tsyringe"

interface UploadAPhotoUseCaseInput {
  photo: Buffer
}

type UploadAPhotoUseCaseOutput = {
  imageUrl: string
}

@injectable()
class UploadAPhotoUseCase {
  constructor(
    @inject('UploadImageServiceInterface')
    private uploadImageService: UploadImageServiceInterface
  ) {}

  public async execute({ photo }: UploadAPhotoUseCaseInput): Promise<UploadAPhotoUseCaseOutput> {
    const imageUrl = await this.uploadImageService.upload({ image: photo })
    return { imageUrl }
  }
}

export { UploadAPhotoUseCase }