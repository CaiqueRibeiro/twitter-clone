import { TweetNotFoundError } from '@domain/tweets/errors/tweet-not-found.error'
import { TweetsRepositoryInterface } from '@domain/tweets/repositories/tweets-repository.interface'
import { LikeATweet } from '@domain/tweets/services/like-a-tweet'
import { UserNotFoundError } from '@domain/users/errors/user-not-found.error'
import { UsersRepositoryInterface } from '@domain/users/repositories/users-repository.interface'
import { injectable, inject } from 'tsyringe'

interface LikeATweetUseCaseInput {
  userId: string
  tweetId: string
  timestamp: string
}

type LikeATweetUseCaseOutput = void

@injectable()
class LikeATweetUseCase {
  constructor(
    @inject('UsersRepositoryInterface')
    private usersRepository: UsersRepositoryInterface,
    @inject('TweetsRepositoryInterface')
    private tweetsRepository: TweetsRepositoryInterface,
  ) {}

  public async execute({
    userId,
    tweetId,
    timestamp,
  }: LikeATweetUseCaseInput): Promise<LikeATweetUseCaseOutput> {
    const user = await this.usersRepository.findById(userId)
    if (!user) throw new UserNotFoundError()

    const tweet = await this.tweetsRepository.findById(tweetId)
    if (!tweet) throw new TweetNotFoundError()

    const like = LikeATweet.execute({ tweet, userWhoLikes: user, timestamp })

    await this.tweetsRepository.addLike(like)
  }
}

export { LikeATweetUseCase }
