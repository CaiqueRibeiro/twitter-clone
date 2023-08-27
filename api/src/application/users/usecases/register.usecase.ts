import { Encrypt } from '@domain/@shared/utils/encrypt'
import { User } from '@domain/users/entities/user'
import { EmailAlreadyInUseError } from '@domain/users/errors/email-already-in-use.error'
import { UsernameAlreadyInUseError } from '@domain/users/errors/username-already-in-use.error'
import { ProfilesRepositoryInterface } from '@domain/users/repositories/profiles-repository.interface'
import { UsersRepositoryInterface } from '@domain/users/repositories/users-repository.interface'

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

    const userByEmail = await this.usersRepository.findByEmail(email)
    if (userByEmail) throw new EmailAlreadyInUseError()

    const userByUsername = await this.usersRepository.findByUsername(username)
    if (userByUsername) throw new UsernameAlreadyInUseError()

    const encryptedPassword = await Encrypt.encryptPassword(password)

    await this.profilesRepository.register({
      username,
      email,
      password: encryptedPassword,
      profileImage,
    })

    const newUser = User.create({
      email,
      username,
      profileImage,
    })

    await this.usersRepository.create(newUser)
  }
}

export { RegisterUseCase }
