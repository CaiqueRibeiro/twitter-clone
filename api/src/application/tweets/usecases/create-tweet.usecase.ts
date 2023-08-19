import "reflect-metadata"
import { injectable, inject } from "tsyringe"
import { CreateATweet } from "../services/create-a-tweet";

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
    @inject('CreateATweet')
    private createATweetService: CreateATweet
  ) {}
  public async execute({ authorId, content, timestamp, referredTweetId }: CreateTweetUseCaseInput): Promise<CreateTweetUseCaseOutput> {
    await this.createATweetService.execute({authorId, content, timestamp, referredTweetId })
  }
}

export { CreateTweetUseCase }
