import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UploadAPhotoUseCase } from '@application/users/usecases/upload-a-photo.usecase'

class UsersRestController {
  public async uploadPhoto(request: Request, response: Response): Promise<Response> {
    const photo = request.file.buffer

    const usecase = container.resolve(UploadAPhotoUseCase)

    const { imageUrl } = await usecase.execute({ photo })

    return response.status(201).json({ imageUrl })
  }
}

export { UsersRestController }