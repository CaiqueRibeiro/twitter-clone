import { UserNotFoundError } from '@domain/users/errors/user-not-found.error'
import { UsersRepositoryInterface } from '@domain/users/repositories/users-repository.interface'
import { injectable, inject } from 'tsyringe'

interface GetUserDataInput {
  userId: string
}

interface GetUserDataOutput {
  id: string
  email: string
  username: string
  profileImage: string
  createdAt: string
  updatedAt: string
}

@injectable()
class GetUserDataUseCase {
  constructor(
    @inject('UsersRepositoryInterface')
    private usersRepository: UsersRepositoryInterface,
  ) {}

  public async execute({
    userId,
  }: GetUserDataInput): Promise<GetUserDataOutput> {
    const user = await this.usersRepository.findById(userId)

    if (!user) throw new UserNotFoundError()
    return { ...user.toJSON() }
  }
}

export { GetUserDataUseCase }
