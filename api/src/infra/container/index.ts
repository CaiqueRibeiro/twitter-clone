import { container } from 'tsyringe'
import { TweetsRepositoryInterface } from '@domain/tweets/repositories/tweets-repository.interface'
import { PrismaTweetsRepository } from '@infra/tweets/repositories/prisma/prisma-tweets-repository'

container.registerSingleton<TweetsRepositoryInterface>(
  'TweetsRepositoryInterface',
  PrismaTweetsRepository,
)
