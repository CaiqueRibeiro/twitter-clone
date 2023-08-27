import { FakeUsersRepository } from '@domain/users/repositories/fakes/fake-users-repository'
import { RegisterUseCase } from './register.usecase'
import { FakeProfilesRepository } from '@domain/users/repositories/fakes/fake-profiles-repository'
import { Encrypt } from '@domain/@shared/utils/encrypt'
import { EmailAlreadyInUseError } from '@domain/users/errors/email-already-in-use.error'
import { User } from '@domain/users/entities/user'
import { UsernameAlreadyInUseError } from '@domain/users/errors/username-already-in-use.error'

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
      email: 'elonmusk@gmail.com',
      password: '123teleton321',
    }

    await usecase.execute(arrange)

    expect(registerSpy).toHaveBeenCalled()
  })

  it('should encrypt users password', async () => {
    const registerSpy = jest.spyOn(profilesRepository, 'register')
    const createUserSpy = jest.spyOn(usersRepository, 'create')
    const encrypSpy = jest.spyOn(Encrypt, 'encryptPassword')

    const arrange = {
      username: 'ElonMusk',
      email: 'elonmusk@gmail.com',
      password: '123teleton321',
    }

    await usecase.execute(arrange)

    expect(registerSpy).toHaveBeenCalled()
    expect(createUserSpy).toHaveBeenCalled()
    expect(encrypSpy).toHaveBeenCalled()
  })

  it('should throw error if email is already in use', async () => {
    const firstRegister = {
      username: 'ElonMusk',
      email: 'elonmusk@gmail.com',
    }

    const user = User.create(firstRegister)

    await usersRepository.create(user)

    const secondRegister = {
      username: 'Zezinho',
      email: 'elonmusk@gmail.com',
      password: '123321',
    }

    await expect(usecase.execute(secondRegister)).rejects.toThrow(
      EmailAlreadyInUseError,
    )
  })

  it('should throw error if username already exists', async () => {
    const firstRegister = {
      username: 'ElonMusk',
      email: 'elonzinho171@gmail.com',
    }

    const user = User.create(firstRegister)

    await usersRepository.create(user)

    const secondRegister = {
      username: 'ElonMusk',
      email: 'elonmusk@gmail.com',
      password: '123321',
    }

    await expect(usecase.execute(secondRegister)).rejects.toThrow(
      UsernameAlreadyInUseError,
    )
  })
})
