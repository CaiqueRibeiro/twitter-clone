import { Encrypt } from "@domain/@shared/utils/encrypt"
import { WrongCredentialsError } from "@domain/users/errors/wrong-credentials.error"
import { ProfilesRepositoryInterface } from "@domain/users/repositories/profiles-repository.interface"
import { UsersRepositoryInterface } from "@domain/users/repositories/users-repository.interface"
import { injectable, inject } from "tsyringe"
import jwt from "jsonwebtoken"

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
  ) { }

  public async execute({ email, password }: LoginUseCaseInput): Promise<LoginUseCaseOutput> {
    const encryptedPassword = await Encrypt.encryptPassword(password)

    const isValidLogin = await this.profilesRepository.login({ email, password: encryptedPassword })

    if(!isValidLogin) throw new WrongCredentialsError()

    const user = await this.usersRepository.findByEmail(email)

    const token = jwt.sign({}, process.env.JWT_SECRET, {
      expiresIn: '24h',
      subject: user.id.value,
    })

    return { token: token }
  }
}

export { LoginUseCase }
