import { Tweet } from "@domain/tweets/entities/tweet";
import { TweetsRepositoryInterface } from "@domain/tweets/repositories/tweets-repository.interface";
import { UserId } from "@domain/users/value-objects/user-id";

interface CreateTweetUseCaseInput {
  authorId: string;
  content: string;
  timestamp: string;
}

type CreateTweetUseCaseOutput = void

class CreateTweetUseCase {
  constructor(
    private tweetsRepository: TweetsRepositoryInterface
  ) {}
  public async execute({ authorId, content, timestamp }: CreateTweetUseCaseInput): Promise<CreateTweetUseCaseOutput> {
    const newTweet = Tweet.create({
      authorId: new UserId(authorId),
      content,
      createdAt: timestamp
    })
    await this.tweetsRepository.create(newTweet)
  }
}

export { CreateTweetUseCase }