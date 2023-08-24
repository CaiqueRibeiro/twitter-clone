import { LikeATweetUseCase } from './like-a-tweet.usecase'
import { FakeTweetsRepository } from '@domain/tweets/repositories/fakes/fake-tweets-repository'
import { Tweet } from '@domain/tweets/entities/tweet'
import { User } from '@domain/users/entities/user'
import { FakeUsersRepository } from '@domain/users/repositories/fakes/fake-users-repository'
import { CyclicLikeOperationError } from '@domain/tweets/errors/cyclic-like-operation.error'
import { UserNotFoundError } from '@domain/users/errors/user-not-found.error'
import { TweetNotFoundError } from '@domain/tweets/errors/tweet-not-found.error'

describe('LikeATweetUseCase unit tests', () => {
  let usersRepository: FakeUsersRepository
  let tweetsRepository: FakeTweetsRepository
  let usecase: LikeATweetUseCase

  const author = User.create({
    username: 'Saitama',
    email: 'saitama@heroassociation.com',
  })

  const tweet = Tweet.create({
    authorId: author.id,
    content: 'Javascript if better than Python',
  })

  const userWhoLikes = User.create({
    username: 'Genos',
    email: 'genos@heroassociation.com',
  })

  beforeEach(() => {
    tweetsRepository = new FakeTweetsRepository()
    usersRepository = new FakeUsersRepository()
    usecase = new LikeATweetUseCase(usersRepository, tweetsRepository)
  })

  it('should like a tweet', async () => {
    await usersRepository.create(author)
    await tweetsRepository.create(tweet)
    await usersRepository.create(userWhoLikes)

    const arrange = {
      userId: userWhoLikes.id.value,
      tweetId: tweet.id.value,
      timestamp: new Date().toISOString(),
    }

    await usecase.execute(arrange)
  })

  it('should not be able to like his own tweet', async () => {
    await usersRepository.create(author)
    await tweetsRepository.create(tweet)
    await usersRepository.create(userWhoLikes)

    const arrange = {
      userId: author.id.value,
      tweetId: tweet.id.value,
      timestamp: new Date().toISOString(),
    }

    await expect(usecase.execute(arrange)).rejects.toThrow(
      CyclicLikeOperationError,
    )
  })

  it('should throw error if user was not found', async () => {
    await usersRepository.create(author)
    await tweetsRepository.create(tweet)

    const arrange = {
      userId: userWhoLikes.id.value,
      tweetId: tweet.id.value,
      timestamp: new Date().toISOString(),
    }

    await expect(usecase.execute(arrange)).rejects.toThrow(UserNotFoundError)
  })

  it('should throw error if tweet was not found', async () => {
    await usersRepository.create(author)
    await usersRepository.create(userWhoLikes)

    const arrange = {
      userId: userWhoLikes.id.value,
      tweetId: tweet.id.value,
      timestamp: new Date().toISOString(),
    }

    await expect(usecase.execute(arrange)).rejects.toThrow(TweetNotFoundError)
  })
})
