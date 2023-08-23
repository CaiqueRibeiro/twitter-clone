import { TweetsRepositoryInterface } from "@domain/tweets/repositories/tweets-repository.interface";
import { LikeATweet } from "@domain/tweets/services/like-a-tweet"
import { UsersRepositoryInterface } from "@domain/users/repositories/users-repository.usecase";

interface LikeATweetUseCaseInput {
  userId: string;
  tweetId: string;
  timestamp: string;
}

type LikeATweetUseCaseOutput = void

class LikeATweetUseCase {
  constructor(
    @inject('TweetsRepositoryInterface')
    private usersRepository: UsersRepositoryInterface,
    @inject('TweetsRepositoryInterface')
    private tweetsRepository: TweetsRepositoryInterface,
  ) {}

  public async execute({ userId, tweetId, timestamp }: LikeATweetUseCaseInput): Promise<LikeATweetUseCaseOutput> {
    const user = await this.usersRepository.findById(userId)
    if(!user) throw new Error('User not found')

    const tweet = await this.tweetsRepository.findById(tweetId)
    if(!tweet) new Error('Tweet not found')

    const like = LikeATweet.execute({ tweet, userWhoLikes: user, timestamp })

    await this.tweetsRepository.addLike(like)
  }
}

export { LikeATweetUseCase }
