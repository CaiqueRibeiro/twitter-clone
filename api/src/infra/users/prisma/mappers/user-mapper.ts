import { User } from '@domain/users/entities/user'
import { User as PrismaUser } from '@prisma/client'

class UserMapper {
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
