import { FakeTweetsRepository } from '@domain/tweets/repositories/fakes/fake-tweets-repository'
import { CreateATweet } from './create-a-tweet'
import { randomUUID } from 'crypto'
import { InvalidReferredTweetError } from '@domain/tweets/errors/invalid-referred-tweet.error'

describe('CreateATweet application service unit tests', () => {
  let tweetsRepository: FakeTweetsRepository
  let createATweetService: CreateATweet

  beforeEach(() => {
    tweetsRepository = new FakeTweetsRepository()
    createATweetService = new CreateATweet(tweetsRepository)
  })

  it('should create a tweet', async () => {
    const arrange = {
      authorId: randomUUID(),
      content: 'I agree totally with it!!!',
      timestamp: '2023-07-22T16:23:55.937Z',
    }

    await createATweetService.execute(arrange)

    const tweets = await tweetsRepository.findAllByAuthorId({
      authorId: arrange.authorId,
    })

    expect(tweets.length).toBe(1)
    expect(tweets[0].referredTweet).toBeUndefined()
  })

  it('should create a retweet', async () => {
    const firstTweet = {
      authorId: randomUUID(),
      content: 'PHP is the most trash language in the world',
      timestamp: '2023-07-20T13:00:55.937Z',
    }

    const tweetToBeReferred = await createATweetService.execute(firstTweet)

    const arrange = {
      authorId: randomUUID(),
      content: 'I agree totally with it!!!',
      timestamp: '2023-07-22T16:23:55.937Z',
      referredTweetId: tweetToBeReferred.id.value,
    }

    await createATweetService.execute(arrange)

    const tweets = await tweetsRepository.findAllByAuthorId({
      authorId: arrange.authorId,
    })

    expect(tweets.length).toBe(1)
    expect(tweets[0].referredTweet.id.value).toBe(tweetToBeReferred.id.value)
  })

  it('should not be able to referrence a non-existing tweet', async () => {
    await expect(() =>
      createATweetService.execute({
        authorId: 'ABC',
        content: 'PHP is for kornos',
        timestamp: '2023-07-22T16:23:55.937Z',
        referredTweetId: randomUUID(),
      }),
    ).rejects.toThrow(InvalidReferredTweetError)
  })
})
