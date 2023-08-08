import { UserId } from "@domain/users/value-objects/user-id"
import { Tweet } from "./tweet"
import { TweetId } from "../value-objects/tweet-id"


describe('Tweet', () => {
  it('should create a new Tweet', () => {
    const tweetProps = {
      authorId: new UserId('e93ace45-8683-43b2-8037-3b2adc909f38'),
      content: 'Hello, world!',
    }
    const tweet = Tweet.create(tweetProps)
    expect(tweet.authorId).toEqual(tweetProps.authorId)
    expect(tweet.content).toEqual(tweetProps.content)
    expect(tweet.isActive).toEqual(true)
  })

  it('should throw an error if authorId is not a valid UUID', () => {
    const invalidAuthorId = 'invalid-uuid'
    expect(() => Tweet.create({
      authorId: new UserId(invalidAuthorId),
      content: 'Hello, world!',
    })).toThrow('Value invalid-uuid must be a valid UUID')
  })

  it('should set isActive to false when deleted', () => {
    const tweetProps = {
      authorId: new UserId('e93ace45-8683-43b2-8037-3b2adc909f38'),
      content: 'Hello, world!',
    }
    const tweet = Tweet.create(tweetProps)
    tweet.delete()
    expect(tweet.isActive).toEqual(false)
  })

  it('should convert Tweet to JSON', () => {
    const tweetProps = {
      authorId: new UserId('e93ace45-8683-43b2-8037-3b2adc909f38'),
      content: 'Hello, world!',
    }
    const tweet = Tweet.create(tweetProps)
    const json = tweet.toJSON()
    expect(json).toEqual({
      id: expect.any(TweetId),
      authorId: tweetProps.authorId,
      content: tweetProps.content,
      isActive: true,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      referredTweet: undefined,
    })
  })
})