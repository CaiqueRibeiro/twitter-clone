import { UserId } from '@domain/users/value-objects/user-id'
import { Like } from './like'
import { TweetId } from './tweet-id'
import { randomUUID } from 'crypto'

describe('Like', () => {
  it('should create a Like object with default timestamp', () => {
    const tweetId = new TweetId(randomUUID())
    const userId = new UserId(randomUUID())
    const like = Like.create({ tweetId, userId })

    expect(like.tweetId.value).toBe(tweetId.value)
    expect(like.userId.value).toBe(userId.value)
    expect(like.timestamp).toBeDefined()
  })

  it('should create a Like object with a given timestamp', () => {
    const tweetId = new TweetId(randomUUID())
    const userId = new UserId(randomUUID())
    const timestamp = new Date('2023-08-15T12:00:00Z')
    const like = Like.create({ tweetId, userId, timestamp })

    expect(like.tweetId).toBe(tweetId)
    expect(like.userId).toBe(userId)
    expect(like.timestamp).toEqual(timestamp)
  })

  it('should serialize to JSON correctly', () => {
    const tweetId = new TweetId(randomUUID())
    const userId = new UserId(randomUUID())
    const timestamp = new Date('2023-08-15T12:00:00Z')
    const like = Like.create({ tweetId, userId, timestamp })

    const expectedJson = {
      tweetId: tweetId.value,
      userId: userId.value,
      timestamp: timestamp.toISOString(),
    }

    expect(like.toJSON()).toEqual(expectedJson)
  })
})
