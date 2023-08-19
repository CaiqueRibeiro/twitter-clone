import { randomUUID } from "crypto"
import { CreateTweetUseCase } from "./create-tweet.usecase"
import { FakeTweetsRepository } from "@domain/tweets/repositories/fakes/fake-tweets-repository"
import NotificationError from "@domain/@shared/notification/notification-error"
import { InvalidUuidError } from "@domain/@shared/value-objects/uuid.vo"
import { CreateATweet } from "../services/create-a-tweet"
import { InvalidReferredTweetError } from "@domain/tweets/errors/invalid-referred-tweet.error"

describe('CreateTweetUseCase unit tests', () => {
  let tweetsRepository: FakeTweetsRepository
  let createATweetService: CreateATweet
  let usecase: CreateTweetUseCase

  beforeEach(() => {
    tweetsRepository = new FakeTweetsRepository()
    createATweetService = new CreateATweet(tweetsRepository)
    usecase = new CreateTweetUseCase(createATweetService)
  })

  it('should create a tweet', async () => {
    const arrange = {
      authorId: randomUUID(),
      content: 'Example of a new Tweet',
      timestamp: '2023-07-22T16:23:55.937Z'
    }

    const findByIdSpy = jest.spyOn(tweetsRepository, 'findById')
    const createSpy = jest.spyOn(tweetsRepository, 'create')
    const serviceSpy = jest.spyOn(createATweetService, 'execute')
    await usecase.execute(arrange)

    const tweets = await tweetsRepository.findAllByAuthorId({ authorId: arrange.authorId })

    expect(findByIdSpy).not.toHaveBeenCalled()
    expect(createSpy).toHaveBeenCalledTimes(1)
    expect(serviceSpy).toHaveBeenCalledTimes(1)
    expect(tweets.length).toBe(1)
  })

  it('should create a retweet (tweet referring to another)', async () => {
    const firstTweet = {
      authorId: randomUUID(),
      content: 'PHP is the most trash language in the world',
      timestamp: '2023-07-20T13:00:55.937Z'
    }

    const tweetToBeReferred = await createATweetService.execute(firstTweet)

    const arrange = {
      authorId: randomUUID(),
      content: 'Example of a new Tweet',
      timestamp: '2023-07-22T16:23:55.937Z',
      referredTweetId: tweetToBeReferred.id.value
    }

    const findByIdSpy = jest.spyOn(tweetsRepository, 'findById')
    const createSpy = jest.spyOn(tweetsRepository, 'create')
    const serviceSpy = jest.spyOn(createATweetService, 'execute')
    await usecase.execute(arrange)

    const tweets = await tweetsRepository.findAllByAuthorId({ authorId: arrange.authorId })

    expect(findByIdSpy).toHaveBeenCalledTimes(1)
    expect(createSpy).toHaveBeenCalledTimes(1)
    expect(serviceSpy).toHaveBeenCalledTimes(1)
    expect(tweets.length).toBe(1)
    expect(tweets[0].referredTweet.id.value).toBe(tweetToBeReferred.id.value)
  })

  it('should not be able to referrence a non-existing tweet', async () => {
    await expect(() => usecase.execute({
      authorId: 'ABC',
      content: 'PHP is for kornos',
      timestamp: '2023-07-22T16:23:55.937Z',
      referredTweetId: randomUUID()
    })).rejects.toThrow(InvalidReferredTweetError)
  })


  it('should not be able to create a tweet with an invalid userId format', async () => {
    await expect(() => usecase.execute({
      authorId: 'ABC',
      content: 'PHP is for kornos',
      timestamp: '2023-07-22T16:23:55.937Z'
    })).rejects.toThrow(InvalidUuidError)
  })

  it('should not be able to create a tweet without a content', async () => {
    const invalidContent = [undefined, null, '']

    invalidContent.forEach(async item => {
      await expect(() => usecase.execute({
        authorId: randomUUID(),
        content: item,
        timestamp: '2023-07-22T16:23:55.937Z'
      })).rejects.toThrow(NotificationError)
    })
  })
})
