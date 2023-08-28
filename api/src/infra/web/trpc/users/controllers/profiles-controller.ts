import { container } from 'tsyringe'
import {
  RegisterRequest,
  RegisterResponse
} from './dtos/profiles-controller.dto'
import { RegisterUseCase } from '@application/users/usecases/register.usecase'
import { UsernameAlreadyInUseError } from '@domain/users/errors/username-already-in-use.error'
import { EmailAlreadyInUseError } from '@domain/users/errors/email-already-in-use.error'

export class ProfilesController {
  public async register(input: RegisterRequest): Promise<RegisterResponse> {
    const { email, password, username, profileImage } = input
    try {
      const usecase = container.resolve(RegisterUseCase)
      await usecase.execute({ email, password, username, profileImage })
      return { message: 'User created.'}
    } catch (error) {
      if (error instanceof UsernameAlreadyInUseError) {
        return { message: error.message }
      }

      if (error instanceof EmailAlreadyInUseError) {
        return { message: error.message }
      }

      return { message: 'Error while trying register a new user.'}
    }
  }
}
