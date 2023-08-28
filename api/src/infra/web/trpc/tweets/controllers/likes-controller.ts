import { container } from 'tsyringe'
import {
  LikeATweetRequest,
  LikeATweetResponse,
} from './dtos/likes-controller.dto'
import { LikeATweetUseCase } from '@application/tweets/usecases/like-a-tweet.usecase'
import { UserNotFoundError } from '@domain/users/errors/user-not-found.error'
import { TweetNotFoundError } from '@domain/tweets/errors/tweet-not-found.error'

export class LikesController {
  public async create(input: LikeATweetRequest): Promise<LikeATweetResponse> {
    const { userId, tweetId, timestamp } = input
    try {
      const usecase = container.resolve(LikeATweetUseCase)
      await usecase.execute({ userId, tweetId, timestamp })
      return { message: 'Like added to this tweet' }
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return { message: error.message }
      }

      if (error instanceof TweetNotFoundError) {
        return { message: error.message }
      }

      return { message: 'Error while trying to like a tweet.' }
    }
  }
}
