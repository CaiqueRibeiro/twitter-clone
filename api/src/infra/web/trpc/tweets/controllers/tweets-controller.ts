import { container } from 'tsyringe'
import { CreateTweetRequest, CreateTweetResponse } from "./dtos/tweets-controller.dto"
import { CreateTweetUseCase } from '@application/tweets/usecases/create-tweet.usecase'

export class TweetsController {
  public async create(input: CreateTweetRequest): Promise<CreateTweetResponse> {
    const { authorId, content, timestamp } = input
    
    const usecase = container.resolve(CreateTweetUseCase)

    await usecase.execute({ authorId, content, timestamp })
  }
}