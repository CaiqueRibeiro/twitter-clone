import { CyclicFollowOperationError } from "@domain/users/errors/cyclic-follow-operation.error"
import { DuplicateFollowingError } from "@domain/users/errors/duplicate-following.error"
import { UserNotFoundError } from "@domain/users/errors/user-not-found.error"
import { UsersRepositoryInterface } from "@domain/users/repositories/users-repository.interface"
import { injectable, inject } from "tsyringe"

interface FollowUseCaseInput {
  userId: string
  userToFollow: string
}

type FollowUseCaseOutput = void

@injectable()
class FollowUseCase {
  constructor(
    @inject('UsersRepositoryInterface')
    private usersRepository: UsersRepositoryInterface
  ) {}

  public async execute({ userId, userToFollow }: FollowUseCaseInput): Promise<FollowUseCaseOutput> {
    const userThatFollows = await this.usersRepository.findById(userId)
    if(!userThatFollows) throw new UserNotFoundError()

    if(userId === userToFollow) throw new CyclicFollowOperationError()

    const userToBeFollowed = await this.usersRepository.findById(userToFollow)
    if(!userToBeFollowed) throw new UserNotFoundError()

    const userFollowers = await this.usersRepository.getFollowers(userToBeFollowed)

    const isLoggedUserAlreadyFollowing = userFollowers.find(user => user.id.value === userId)

    if(isLoggedUserAlreadyFollowing) throw new DuplicateFollowingError()

    await this.usersRepository.followUser(userId, userToFollow)

  }
}

export { FollowUseCase }