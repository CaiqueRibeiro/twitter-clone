import { FakeProfilesRepository } from '@domain/users/repositories/fakes/fake-profiles-repository'
import { FakeUsersRepository } from '@domain/users/repositories/fakes/fake-users-repository'
import { LoginUseCase } from './login.usecase'
import { WrongCredentialsError } from '@domain/users/errors/wrong-credentials.error'
import { User } from '@domain/users/entities/user'
import { Encrypt } from '@domain/@shared/utils/encrypt'

describe('LoginUseCase unit tests', () => {
  let usersRepository: FakeUsersRepository
  let profilesRepository: FakeProfilesRepository
  let usecase: LoginUseCase

  const user = User.create({
    email: 'elon_musk@gmail.com',
    username: 'ElonMusk',
  })

  const profileDTO = {
    email: 'elon_musk@gmail.com',
    password: 'twitterismine666',
  }

  beforeEach(() => {
    usersRepository = new FakeUsersRepository()
    profilesRepository = new FakeProfilesRepository()
    usecase = new LoginUseCase(usersRepository, profilesRepository)
  })

  it('should login using email and password', async () => {
    await profilesRepository.register({
      email: profileDTO.email,
      password: await Encrypt.encryptPassword(profileDTO.password),
    })
    await usersRepository.create(user)

    const arrange = {
      email: 'elon_musk@gmail.com',
      password: 'twitterismine666',
    }

    const { token } = await usecase.execute(arrange)

    expect(token).toBeDefined()
  })

  it('throw error if email does not match', async () => {
    await profilesRepository.register({
      email: profileDTO.email,
      password: await Encrypt.encryptPassword(profileDTO.password),
    })
    await usersRepository.create(user)

    const arrange = {
      email: 'elonzito@gmail.com',
      password: 'twitterismine666',
    }

    await expect(usecase.execute(arrange)).rejects.toThrow(
      WrongCredentialsError,
    )
  })

  it('throw error if password does not match', async () => {
    await profilesRepository.register({
      email: profileDTO.email,
      password: await Encrypt.encryptPassword(profileDTO.password),
    })
    await usersRepository.create(user)

    const arrange = {
      email: 'elon_musk@gmail.com',
      password: '123elon321',
    }

    await expect(usecase.execute(arrange)).rejects.toThrow(
      WrongCredentialsError,
    )
  })
})
