import { container } from 'tsyringe'
import { TweetsRepositoryInterface } from '@domain/tweets/repositories/tweets-repository.interface'
import { PrismaTweetsRepository } from '@infra/tweets/repositories/prisma/prisma-tweets-repository'
import { UsersRepositoryInterface } from '@domain/users/repositories/users-repository.interface'
import { PrismaUsersRepository } from '@infra/users/prisma/prisma-users-repository'
import { ProfilesRepositoryInterface } from '@domain/users/repositories/profiles-repository.interface'
import { PrismaProfilesRepository } from '@infra/users/prisma/prisma-profiles-repository'
import { CreateATweet } from '@application/tweets/services/create-a-tweet'
import UploadImageServiceInterface from '@application/@shared/services/upload-image.interface'
import { UploadImageService } from '@infra/@shared/services/upload-image'
import StorageProviderInterface from '@infra/@shared/providers/image-storage'
import { S3StorageProvider } from '@infra/@shared/providers/aws/s3-storage'

container.registerSingleton<CreateATweet>(
  'CreateATweet',
  CreateATweet,
)

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

container.registerSingleton<StorageProviderInterface>(
  'StorageProviderInterface',
  S3StorageProvider
)


container.registerSingleton<UploadImageServiceInterface>(
  'UploadImageServiceInterface',
  UploadImageService
)
