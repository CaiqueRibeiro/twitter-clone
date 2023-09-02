import { User } from '@domain/users/entities/user'
import { FakeUsersRepository } from '@domain/users/repositories/fakes/fake-users-repository'
import { FollowUseCase } from './follow.usecase'
import { UserNotFoundError } from '@domain/users/errors/user-not-found.error'
import { CyclicFollowOperationError } from '@domain/users/errors/cyclic-follow-operation.error'
import { DuplicateFollowingError } from '@domain/users/errors/duplicate-following.error'

describe('FollowUseCase unit tests', () => {
  let usersRepository: FakeUsersRepository
  let usecase: FollowUseCase

  const myUser = User.create({
    email: 'marco_zuckebergo@gmail.com',
    username: 'Marco_Zuckebergo',
  })

  const userToFollow = User.create({
    email: 'elonmanco@gmail.com',
    username: 'ElonManco',
  })

  beforeEach(() => {
    usersRepository = new FakeUsersRepository()
    usecase = new FollowUseCase(usersRepository)
  })

  it('should be able to follow another user', async () => {
    await usersRepository.create(myUser)
    await usersRepository.create(userToFollow)

    const arrange = {
      userId: myUser.id.value,
      userToFollow: userToFollow.id.value,
    }

    await usecase.execute(arrange)

    const userFollowers = await usersRepository.getFollowers(userToFollow)

    expect(userFollowers.length).toBe(1)
    expect(userFollowers[0].id.value).toBe(myUser.id.value)
  })

  it('should throw error if user that is trying to follow other does not exist', async () => {
    await usersRepository.create(userToFollow)

    const arrange = {
      userId: myUser.id.value,
      userToFollow: userToFollow.id.value,
    }

    await expect(usecase.execute(arrange)).rejects.toThrow(UserNotFoundError)
  })

  it('should throw error it is trying to follow an user that does not exist', async () => {
    await usersRepository.create(myUser)

    const arrange = {
      userId: myUser.id.value,
      userToFollow: userToFollow.id.value,
    }

    await expect(usecase.execute(arrange)).rejects.toThrow(UserNotFoundError)
  })

  it('should throw error it is trying to follow himself', async () => {
    await usersRepository.create(myUser)

    const arrange = {
      userId: myUser.id.value,
      userToFollow: myUser.id.value,
    }

    await expect(usecase.execute(arrange)).rejects.toThrow(
      CyclicFollowOperationError,
    )
  })

  it('should throw error it is trying to follow a user twice', async () => {
    await usersRepository.create(myUser)
    await usersRepository.create(userToFollow)

    const arrange = {
      userId: myUser.id.value,
      userToFollow: userToFollow.id.value,
    }

    await usecase.execute(arrange)

    await expect(usecase.execute(arrange)).rejects.toThrow(
      DuplicateFollowingError,
    )
  })
})
