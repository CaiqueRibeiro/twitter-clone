import { container } from 'tsyringe'
import {
  CreateTweetRequest,
  CreateTweetResponse,
  ListTweetsByFollowerRequest,
  ListTweetsByFollowerResponse,
} from './dtos/tweets-controller.dto'
import { CreateTweetUseCase } from '@application/tweets/usecases/create-tweet.usecase'
import { GetUsersFeedUseCase } from '@application/tweets/usecases/get-users-feed.usecase'

export class TweetsController {
  public async create(input: CreateTweetRequest): Promise<CreateTweetResponse> {
    const { authorId, content, timestamp, referredTweetId } = input
    try {
      const usecase = container.resolve(CreateTweetUseCase)
      await usecase.execute({ authorId, content, timestamp, referredTweetId })
      return { message: 'Tweet created.' }
    } catch (error) {
      console.log(error)
      return { message: 'Error while trying to create tweet.' }
    }
  }

  public async index(
    input: ListTweetsByFollowerRequest,
  ): Promise<ListTweetsByFollowerResponse> {
    const { followerId } = input
    try {
      const usecase = container.resolve(GetUsersFeedUseCase)
      const tweets = await usecase.execute({ followerId })
      return tweets
    } catch (error) {
      return { message: 'Error while trying to list your tweets' }
    }
  }
}

