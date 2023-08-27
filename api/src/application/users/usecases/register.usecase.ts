import { Encrypt } from '@domain/@shared/utils/encrypt'
import { ProfilesRepositoryInterface } from '@domain/users/repositories/profiles-repository.interface'
import { UsersRepositoryInterface } from '@domain/users/repositories/users-repository.usecase'

interface RegisterUseCaseInput {
  username: string
  email: string
  password: string
  profileImage?: string
}

type RegisterUseCaseOutput = void

class RegisterUseCase {
  constructor(
    private usersRepository: UsersRepositoryInterface,
    private profilesRepository: ProfilesRepositoryInterface,
  ) {}

  public async execute(
    input: RegisterUseCaseInput,
  ): Promise<RegisterUseCaseOutput> {
    const { username, email, password, profileImage } = input

    // const userByEmail = await this.usersRepository.findByEmail(email)
    // if (userByEmail) throw new ConflictError('This email is already in use')

    // const userByUsername = await this.usersRepository.findByUserName(username)
    // if (userByUsername)
    //   throw new ConflictError('This username is already in use')

    const encryptedPassword = await Encrypt.encryptPassword(password)

    await this.profilesRepository.register({
      username,
      email,
      password: encryptedPassword,
      profileImage,
    })
  }
}

export { RegisterUseCase }
