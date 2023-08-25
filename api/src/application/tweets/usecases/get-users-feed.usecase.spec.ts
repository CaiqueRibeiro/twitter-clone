import { randomUUID } from 'crypto'
import { GetUsersFeedUseCase } from './get-users-feed.usecase'
import { FakeTweetsRepository } from '@domain/tweets/repositories/fakes/fake-tweets-repository'
import { Feed } from '@domain/tweets/entities/feed'
import { UserId } from '@domain/users/value-objects/user-id'
import { FeedId } from '@domain/tweets/value-objects/feed-id'
import { Tweet } from '@domain/tweets/entities/tweet'

describe('GetUsersFeedUseCase', () => {
  let tweetsRepository: FakeTweetsRepository
  let usecase: GetUsersFeedUseCase

  const tweetRaws = [
    {
      id: '6258d25e-331c-4410-9b4c-b12475a23ef2',
      content: 'celoiro',
      active: true,
      authorId: new UserId('148d43dc-5163-41f5-85f1-bce4af707466'),
      referred_tweet_id: null as string,
      createdAt: '2023-08-18T01:37:43.659Z',
      updatedAt: '2023-08-18T01:37:43.659Z',
    },
    {
      id: 'cdb6c047-93b0-4e49-b365-d2047118818d',
      content: 'celoiro',
      active: true,
      authorId: new UserId('148d43dc-5163-41f5-85f1-bce4af707466'),
      referred_tweet_id: null as string,
      createdAt: '2023-08-18T01:37:43.659Z',
      updatedAt: '2023-08-18T01:37:43.659Z',
    },
  ]

  const feed = Feed.create({
    id: new FeedId('80577f4c-dc4b-40ee-bf63-8a279b245c60'),
    userId: new UserId('148d43dc-5163-41f5-85f1-bce4af707466'),
    tweets: tweetRaws.map(item => Tweet.create(item)),
  })

  beforeEach(() => {
    tweetsRepository = new FakeTweetsRepository()
    usecase = new GetUsersFeedUseCase(tweetsRepository)
  })

  it("should retrieve the user's feed", async () => {
    tweetsRepository.findFeedByFollowerId = jest.fn().mockResolvedValue(feed)
    const findFeedSpy = jest.spyOn(tweetsRepository, 'findFeedByFollowerId')

    const followerId = randomUUID()
    const result = await usecase.execute({ followerId })

    expect(result.feed).toEqual({
      id: '80577f4c-dc4b-40ee-bf63-8a279b245c60',
      userId: '148d43dc-5163-41f5-85f1-bce4af707466',
      tweets: [
        {
          id: '6258d25e-331c-4410-9b4c-b12475a23ef2',
          authorId: '148d43dc-5163-41f5-85f1-bce4af707466',
          content: 'celoiro',
          isActive: true,
          createdAt: '2023-08-18T01:37:43.659Z',
          updatedAt: '2023-08-18T01:37:43.659Z',
          referredTweet: undefined,
        },
        {
          id: 'cdb6c047-93b0-4e49-b365-d2047118818d',
          authorId: '148d43dc-5163-41f5-85f1-bce4af707466',
          content: 'celoiro',
          isActive: true,
          createdAt: '2023-08-18T01:37:43.659Z',
          updatedAt: '2023-08-18T01:37:43.659Z',
          referredTweet: undefined,
        },
      ],
    })

    expect(findFeedSpy).toHaveBeenCalledWith(followerId)
  })

  it('should throw an error when the repository fails to retrieve the feed', async () => {
    const followerId = randomUUID()

    tweetsRepository.findFeedByFollowerId = jest
      .fn()
      .mockRejectedValue(new Error())

    await expect(usecase.execute({ followerId })).rejects.toThrow()
  })
})
