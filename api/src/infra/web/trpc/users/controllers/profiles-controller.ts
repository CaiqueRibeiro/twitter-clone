import { container } from 'tsyringe'
import {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
} from './dtos/profiles-controller.dto'
import { RegisterUseCase } from '@application/users/usecases/register.usecase'
import { UsernameAlreadyInUseError } from '@domain/users/errors/username-already-in-use.error'
import { EmailAlreadyInUseError } from '@domain/users/errors/email-already-in-use.error'
import { LoginUseCase } from '@application/users/usecases/login.usecase'
import { WrongCredentialsError } from '@domain/users/errors/wrong-credentials.error'

export class ProfilesController {
  public async register(input: RegisterRequest): Promise<RegisterResponse> {
    const { email, password, username, profileImage } = input
    try {
      const usecase = container.resolve(RegisterUseCase)
      await usecase.execute({ email, password, username, profileImage })
      return { message: 'User created.' }
    } catch (error) {
      if (error instanceof UsernameAlreadyInUseError) {
        return { message: error.message }
      }

      if (error instanceof EmailAlreadyInUseError) {
        return { message: error.message }
      }

      return { message: 'Error while trying register a new user.' }
    }
  }

  public async login(input: LoginRequest): Promise<LoginResponse> {
    const { email, password } = input
    try {
      const usecase = container.resolve(LoginUseCase)
      const token = await usecase.execute({ email, password })
      return token
    } catch (error) {
      if (error instanceof WrongCredentialsError) {
        return { message: error.message }
      }

      return { message: 'Error while trying login.' }
    }
  }
}
