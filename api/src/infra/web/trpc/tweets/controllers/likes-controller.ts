import { container } from 'tsyringe'
import {
  LikeATweetRequest,
  LikeATweetResponse,
} from './dtos/likes-controller.dto'
import { LikeATweetUseCase } from '@application/tweets/usecases/like-a-tweet.usecase'

export class LikesController {
  public async create(input: LikeATweetRequest): Promise<LikeATweetResponse> {
    const { userId, tweetId, timestamp } = input
    const usecase = container.resolve(LikeATweetUseCase)
    await usecase.execute({ userId, tweetId, timestamp })
  }
}
