import { prisma } from '@config/prisma'
import { ProfileMapper } from './mappers/profile-mapper'
import {
  ProfilesRepositoryInterface,
  RegisterInput,
} from '@domain/users/repositories/profiles-repository.interface'

class PrismaProfilesRepository implements ProfilesRepositoryInterface {
  async register(input: RegisterInput): Promise<void> {
    const raw = ProfileMapper.toPrisma(input)
    await prisma.profile.create({
      data: { ...raw },
    })
  }

  async login({email, password }: RegisterInput): Promise<boolean> {
    const profile = await prisma.profile.findFirst({
      where: { AND: [{email},{password}] }
    })

    if(profile) {
      return true
    }

    return false
  }
}

export { PrismaProfilesRepository }
