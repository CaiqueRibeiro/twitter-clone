import { TweetNotFoundError } from '@domain/tweets/errors/tweet-not-found.error'
import { TweetsRepositoryInterface } from '@domain/tweets/repositories/tweets-repository.interface'
import { ReplyATweet } from '@domain/tweets/services/reply-a-tweet'
import { UserNotFoundError } from '@domain/users/errors/user-not-found.error'
import { UsersRepositoryInterface } from '@domain/users/repositories/users-repository.usecase'
import { injectable, inject } from 'tsyringe'

interface ReplyATweetUseCaseInput {
  content: string
  userId: string
  tweetId: string
  timestamp: string
}

type ReplyATweetUseCaseOutput = void

@injectable()
class ReplyATweetUseCase {
  constructor(
    @inject('TweetsRepositoryInterface')
    private usersRepository: UsersRepositoryInterface,
    @inject('TweetsRepositoryInterface')
    private tweetsRepository: TweetsRepositoryInterface,
  ) {}

  public async execute({
    content,
    userId,
    tweetId,
    timestamp,
  }: ReplyATweetUseCaseInput): Promise<ReplyATweetUseCaseOutput> {
    const user = await this.usersRepository.findById(userId)
    if (!user) throw new UserNotFoundError()

    const tweet = await this.tweetsRepository.findById(tweetId)
    if (!tweet) throw new TweetNotFoundError()

    const reply = ReplyATweet.execute({ content, tweet, user, timestamp })

    await this.tweetsRepository.reply(reply)
  }
}

export { ReplyATweetUseCase }
