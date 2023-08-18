import "reflect-metadata"
import { Tweet } from "@domain/tweets/entities/tweet"
import { TweetsRepositoryInterface } from "@domain/tweets/repositories/tweets-repository.interface"
import { UserId } from "@domain/users/value-objects/user-id"
import { injectable, inject } from "tsyringe"

interface CreateTweetUseCaseInput {
  authorId: string;
  content: string;
  timestamp: string;
  referredTweetId?: string;
}

type CreateTweetUseCaseOutput = void

@injectable()
class CreateTweetUseCase {
  constructor(
    @inject('TweetsRepositoryInterface')
    private tweetsRepository: TweetsRepositoryInterface
  ) {}
  public async execute({ authorId, content, timestamp, referredTweetId }: CreateTweetUseCaseInput): Promise<CreateTweetUseCaseOutput> {
    const newTweet = Tweet.create({
      authorId: new UserId(authorId),
      content,
      createdAt: timestamp,
    })
    await this.tweetsRepository.create(newTweet)
  }
}

export { CreateTweetUseCase }
