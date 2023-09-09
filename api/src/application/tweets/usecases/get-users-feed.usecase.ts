import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import { TweetsRepositoryInterface } from '@domain/tweets/repositories/tweets-repository.interface'
import { Feed } from '@domain/tweets/entities/feed'
import { FeedNotFoundError } from '@domain/tweets/errors/feed-not-found.error'

interface GetUsersFeedUseCaseInput {
  followerId: string
}

interface GetUsersFeedUseCaseOutput {
  feed: ReturnType<typeof Feed.prototype.toJSON>
}

@injectable()
class GetUsersFeedUseCase {
  constructor(
    @inject('TweetsRepositoryInterface')
    private tweetsRepository: TweetsRepositoryInterface,
  ) {}

  public async execute({
    followerId,
  }: GetUsersFeedUseCaseInput): Promise<GetUsersFeedUseCaseOutput> {
    const feed = await this.tweetsRepository.findFeedByFollowerId(followerId)
    if (!feed) throw new FeedNotFoundError()
    return { feed: feed.toJSON() }
  }
}

export { GetUsersFeedUseCase }
