import { FakeTweetsRepository } from '@domain/tweets/repositories/fakes/fake-tweets-repository'
import { Tweet } from '@domain/tweets/entities/tweet'
import { User } from '@domain/users/entities/user'
import { FakeUsersRepository } from '@domain/users/repositories/fakes/fake-users-repository'
import { UserNotFoundError } from '@domain/users/errors/user-not-found.error'
import { TweetNotFoundError } from '@domain/tweets/errors/tweet-not-found.error'
import { ReplyATweetUseCase } from './reply-a-tweet.usecase'

describe('ReplyATweetUseCase unit tests', () => {
  let usersRepository: FakeUsersRepository
  let tweetsRepository: FakeTweetsRepository
  let usecase: ReplyATweetUseCase

  const author = User.create({
    username: 'Saitama',
    email: 'saitama@heroassociation.com',
  })

  const tweet = Tweet.create({
    authorId: author.id,
    content: 'Javascript if better than Python',
  })

  const userWhoReplies = User.create({
    username: 'Genos',
    email: 'genos@heroassociation.com',
  })

  beforeEach(() => {
    tweetsRepository = new FakeTweetsRepository()
    usersRepository = new FakeUsersRepository()
    usecase = new ReplyATweetUseCase(usersRepository, tweetsRepository)
  })

  it('should reply a tweet', async () => {
    await usersRepository.create(author)
    await tweetsRepository.create(tweet)
    await usersRepository.create(userWhoReplies)

    const arrange = {
      userId: userWhoReplies.id.value,
      tweetId: tweet.id.value,
      content: 'Testing reply',
      timestamp: new Date().toISOString(),
    }

    await usecase.execute(arrange)
  })

  it('should throw error if user was not found', async () => {
    await usersRepository.create(author)
    await tweetsRepository.create(tweet)

    const arrange = {
      userId: userWhoReplies.id.value,
      tweetId: tweet.id.value,
      content: 'Testing reply',
      timestamp: new Date().toISOString(),
    }

    await expect(usecase.execute(arrange)).rejects.toThrow(UserNotFoundError)
  })

  it('should throw error if tweet was not found', async () => {
    await usersRepository.create(author)
    await usersRepository.create(userWhoReplies)

    const arrange = {
      userId: userWhoReplies.id.value,
      tweetId: tweet.id.value,
      content: 'Testing reply',
      timestamp: new Date().toISOString(),
    }

    await expect(usecase.execute(arrange)).rejects.toThrow(TweetNotFoundError)
  })
})
