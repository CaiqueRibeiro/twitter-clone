import { container } from 'tsyringe'
import { CreateTweetRequest, CreateTweetResponse, ListTweetsByFollowerRequest, ListTweetsByFollowerResponse } from "./dtos/tweets-controller.dto"
import { CreateTweetUseCase } from '@application/tweets/usecases/create-tweet.usecase'
import { ListFollowersTweetUseCase } from '@application/tweets/usecases/list-followers-tweet.usecase'

export class TweetsController {
  public async create(input: CreateTweetRequest): Promise<CreateTweetResponse> {
    const { authorId, content, timestamp } = input
    const usecase = container.resolve(CreateTweetUseCase)
    await usecase.execute({ authorId, content, timestamp })
  }

  public async index(input: ListTweetsByFollowerRequest): Promise<ListTweetsByFollowerResponse> {
    const { followerId } = input
    const usecase = container.resolve(ListFollowersTweetUseCase)
    const tweets = await usecase.execute({ followerId })
    return tweets
  }
}
