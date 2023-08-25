import { prisma } from '@config/prisma'
import { UserMapper } from './mappers/user-mapper'
import { UsersRepositoryInterface } from '@domain/users/repositories/users-repository.usecase'
import { User } from '@domain/users/entities/user'
import { UserId } from '@domain/users/value-objects/user-id'

class PrismaUsersRepository implements UsersRepositoryInterface {
  async findById(userId: string | UserId): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId instanceof UserId ? userId.value : userId,
      },
    })

    if (!user) return null

    return UserMapper.toEntity(user)
  }
}

export { PrismaUsersRepository }
