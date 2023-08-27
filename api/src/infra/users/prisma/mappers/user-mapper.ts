import { User } from '@domain/users/entities/user'
import { User as PrismaUser } from '@prisma/client'

class UserMapper {
  public static toPrisma(user: User) {
    const map = {
      id: user.id.value,
      username: user.username,
      email: user.email,
      profile_image: user.profileImage,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    }

    return map
  }

  public static toEntity(input: PrismaUser): User {
    const user = User.create({
      id: input.id,
      email: input.email,
      username: input.username,
      profileImage: input.profile_image,
      createdAt: input.created_at.toISOString(),
      updatedAt: input.updated_at.toISOString(),
    })

    return user
  }
}

export { UserMapper }
