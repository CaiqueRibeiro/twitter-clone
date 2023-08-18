import { randomUUID } from "crypto"
import { CreateTweetUseCase } from "./create-tweet.usecase"
import { FakeTweetsRepository } from "@domain/tweets/repositories/fakes/fake-tweets-repository"
import NotificationError from "@domain/@shared/notification/notification-error"
import { InvalidUuidError } from "@domain/@shared/value-objects/uuid.vo"

describe('CreateTweetUseCase unit tests', () => {
  let tweetsRepository: FakeTweetsRepository
  let usecase: CreateTweetUseCase

  beforeEach(() => {
    tweetsRepository = new FakeTweetsRepository()
    usecase = new CreateTweetUseCase(tweetsRepository)
  })

  it('should create a tweet', async () => {
    const arrange = {
      authorId: randomUUID(),
      content: 'Example of a new Tweet',
      timestamp: '2023-07-22T16:23:55.937Z'
    }

    const createSpy = jest.spyOn(tweetsRepository, 'create')
    await usecase.execute(arrange)

    const tweets = await tweetsRepository.findAllByAuthorId({ authorId: arrange.authorId })

    expect(createSpy).toHaveBeenCalledTimes(1)
    expect(tweets.length).toBe(1)
  })

  it('should not be able to create a tweet with an invalid userId format', async () => {
      await expect(() => usecase.execute({
        authorId: 'ABC',
        content: 'PHP is for kornos',
        timestamp: '2023-07-22T16:23:55.937Z'
      })).rejects.toThrow(InvalidUuidError)
  })

  it('should not be able to create a tweet wihout a content', async () => {
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
