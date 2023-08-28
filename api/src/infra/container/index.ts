import { container } from 'tsyringe'
import { TweetsRepositoryInterface } from '@domain/tweets/repositories/tweets-repository.interface'
import { PrismaTweetsRepository } from '@infra/tweets/repositories/prisma/prisma-tweets-repository'
import { UsersRepositoryInterface } from '@domain/users/repositories/users-repository.interface'
import { PrismaUsersRepository } from '@infra/users/prisma/prisma-users-repository'
import { ProfilesRepositoryInterface } from '@domain/users/repositories/profiles-repository.interface'
import { PrismaProfilesRepository } from '@infra/users/prisma/prisma-profiles-repository'

container.registerSingleton<TweetsRepositoryInterface>(
  'TweetsRepositoryInterface',
  PrismaTweetsRepository,
)

container.registerSingleton<UsersRepositoryInterface>(
  'UsersRepositoryInterface',
  PrismaUsersRepository,
)

container.registerSingleton<ProfilesRepositoryInterface>(
  'ProfilesRepositoryInterface',
  PrismaProfilesRepository,
)
