import { User } from '@domain/users/entities/user'
import { FakeUsersRepository } from '@domain/users/repositories/fakes/fake-users-repository'
import { UserNotFoundError } from '@domain/users/errors/user-not-found.error'
import { GetUserDataUseCase } from './get-user-data.usecase'

describe('GetUserDataUseCase unit tests', () => {
  let usersRepository: FakeUsersRepository
  let usecase: GetUserDataUseCase

  const myUser = User.create({
    email: 'marco_zuckebergo@gmail.com',
    username: 'Marco_Zuckebergo',
  })


  beforeEach(() => {
    usersRepository = new FakeUsersRepository()
    usecase = new GetUserDataUseCase(usersRepository)
  })

  it('should be able get users data', async () => {
    await usersRepository.create(myUser)

    const arrange = {
      userId: myUser.id.value,
    }

    const result = await usecase.execute(arrange)

    expect(result).toEqual({
      id: myUser.id.value,
      username: myUser.username,
      email: myUser.email,
      profileImage: myUser.profileImage,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      })
  })

  it('should throw error if is trying to get data from a user that not exists', async () => {
    const arrange = {
      userId: myUser.id.value,
    }

    await expect(usecase.execute(arrange)).rejects.toThrow(UserNotFoundError)
  })
})
