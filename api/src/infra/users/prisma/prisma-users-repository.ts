import { prisma } from '@config/prisma'
import { UserMapper } from './mappers/user-mapper'
import { UsersRepositoryInterface } from '@domain/users/repositories/users-repository.interface'
import { User } from '@domain/users/entities/user'
import { UserId } from '@domain/users/value-objects/user-id'

class PrismaUsersRepository implements UsersRepositoryInterface {
  async create(user: User): Promise<void> {
    const raw = UserMapper.toPrisma(user)
    await prisma.user.create({
      data: { ...raw },
    })
  }

  async findById(userId: string | UserId): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId instanceof UserId ? userId.value : userId,
      },
    })

    if (!user) return null

    return UserMapper.toEntity(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if (!user) return null

    return UserMapper.toEntity(user)
  }

  async findByUsername(username: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    })

    if (!user) return null

    return UserMapper.toEntity(user)
  }
}

export { PrismaUsersRepository }
