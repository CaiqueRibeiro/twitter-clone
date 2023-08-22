import "reflect-metadata"
import { injectable, inject } from "tsyringe"
import { TweetsRepositoryInterface } from "@domain/tweets/repositories/tweets-repository.interface";
import { Tweet } from "@domain/tweets/entities/tweet";

interface ListFollowersTweetUseCaseInput {
  followerId: string;
}

interface ListFollowersTweetUseCaseOutput {
  tweets: Tweet[]
}

@injectable()
class ListFollowersTweetUseCase {
  constructor(
    @inject('TweetsRepositoryInterface')
    private tweetsRepository: TweetsRepositoryInterface
  ) {}

  public async execute({ followerId }: ListFollowersTweetUseCaseInput): Promise<ListFollowersTweetUseCaseOutput> {
    const tweets = await this.tweetsRepository.findAllByFollowerId(followerId)
    return { tweets }
  }
}

export { ListFollowersTweetUseCase }
