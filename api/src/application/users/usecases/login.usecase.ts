import { Encrypt } from '@domain/@shared/utils/encrypt'
import { WrongCredentialsError } from '@domain/users/errors/wrong-credentials.error'
import { ProfilesRepositoryInterface } from '@domain/users/repositories/profiles-repository.interface'
import { UsersRepositoryInterface } from '@domain/users/repositories/users-repository.interface'
import { injectable, inject } from 'tsyringe'
import jwt from 'jsonwebtoken'
import { UserNotFoundError } from '@domain/users/errors/user-not-found.error'

interface LoginUseCaseInput {
  email: string
  password: string
}

interface LoginUseCaseOutput {
  token: string
}

@injectable()
class LoginUseCase {
  constructor(
    @inject('UsersRepositoryInterface')
    private usersRepository: UsersRepositoryInterface,
    @inject('ProfilesRepositoryInterface')
    private profilesRepository: ProfilesRepositoryInterface,
  ) {}

  public async execute({
    email,
    password,
  }: LoginUseCaseInput): Promise<LoginUseCaseOutput> {
    const encryptedPassword = await Encrypt.encryptPassword(password)

    const isValidLogin = await this.profilesRepository.login({
      email,
      password: encryptedPassword,
    })

    if (!isValidLogin) throw new WrongCredentialsError()

    const user = await this.usersRepository.findByEmail(email)

    if(!user) throw new UserNotFoundError()

    const token = jwt.sign({}, process.env.JWT_SECRET as string, {
      expiresIn: '24h',
      subject: user.id.value,
    })

    return { token: token }
  }
}

export { LoginUseCase }
