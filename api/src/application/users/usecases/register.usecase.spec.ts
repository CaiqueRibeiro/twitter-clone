import { FakeUsersRepository } from '@domain/users/repositories/fakes/fake-users-repository'
import { RegisterUseCase } from './register.usecase'
import { FakeProfilesRepository } from '@domain/users/repositories/fakes/fake-profiles-repository'

describe('RegisterUseCase unit tests', () => {
  let usersRepository: FakeUsersRepository
  let profilesRepository: FakeProfilesRepository
  let usecase: RegisterUseCase

  beforeEach(() => {
    usersRepository = new FakeUsersRepository()
    profilesRepository = new FakeProfilesRepository()
    usecase = new RegisterUseCase(usersRepository, profilesRepository)
  })

  it('should register a new user', async () => {
    const registerSpy = jest.spyOn(profilesRepository, 'register')

    const arrange = {
      username: 'ElonMusk',
      email: 'elonmusk@tesla.com',
      password: '123teleton321',
    }

    await usecase.execute(arrange)

    expect(registerSpy).toHaveBeenCalled()
  })

  it('should encrypt users password', async () => {
    const registerSpy = jest.spyOn(profilesRepository, 'register')

    const arrange = {
      username: 'ElonMusk',
      email: 'elonmusk@tesla.com',
      password: '123teleton321',
    }

    await usecase.execute(arrange)

    expect(registerSpy).toHaveBeenCalled()
  })

  test.todo('should throw error if email is already in use')

  test.todo('should throw error if username already exists')
})
