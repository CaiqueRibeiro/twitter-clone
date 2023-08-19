import "reflect-metadata"
import { injectable, inject } from "tsyringe"
import { TweetsRepositoryInterface } from "@domain/tweets/repositories/tweets-repository.interface";

interface ListFollowersTweetUseCaseInput {
  followerId: string;
}

interface ListFollowersTweetUseCaseOutput {

}

@injectable()
class ListFollowersTweetUseCase {
  constructor(
    @inject('TweetsRepositoryInterface')
    private tweetsRepository: TweetsRepositoryInterface
  ) {}
  public async execute({ followerId }: ListFollowersTweetUseCaseInput): Promise<any> {
    // await this.tweetsRepository.findAllByFollowerId()
    return []
  }
}

export { ListFollowersTweetUseCase }
