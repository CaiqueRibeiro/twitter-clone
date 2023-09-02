import { container } from 'tsyringe'
import { FollowRequest, FollowResponse } from './dtos/users-controller.dto'
import { FollowUseCase } from '@application/users/usecases/follow.usecase'
import { UserNotFoundError } from '@domain/users/errors/user-not-found.error'
import { CyclicFollowOperationError } from '@domain/users/errors/cyclic-follow-operation.error'

export class UsersController {
  public async follow(input: FollowRequest): Promise<FollowResponse> {
    const { userId, userToFollow } = input
    try {
      const usecase = container.resolve(FollowUseCase)
      await usecase.execute({ userId, userToFollow })
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return { message: error.message }
      }

      if (error instanceof CyclicFollowOperationError) {
        return { message: error.message }
      }

      return { message: 'Error while trying follow an user.' }
    }
  }
}
