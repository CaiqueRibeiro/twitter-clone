import { User } from '@domain/users/entities/user'
import { Tweet } from '../entities/tweet'
import { LikeATweet } from './like-a-tweet'
import { CyclicLikeOperationError } from '../errors/cyclic-like-operation.error'

describe('LikeATweet domain service unit tests', () => {
  it('should throw error if user tries to like his own tweet', () => {
    const userWhoMadeTweet = User.create({
      email: 'komero_miyamada@gmail.com',
      username: 'Komero Miyamada',
    })

    const tweet = Tweet.create({
      authorId: userWhoMadeTweet.id,
      content: 'That is a very good tweet',
    })

    expect(() =>
      LikeATweet.execute({
        tweet: tweet,
        userWhoLikes: userWhoMadeTweet,
        timestamp: new Date().toISOString(),
      }),
    ).toThrow(CyclicLikeOperationError)
  })

  it('should be able to like a tweet', () => {
    const userWhoMakeTweet = User.create({
      email: 'komero_miyamada@gmail.com',
      username: 'Komero Miyamada',
    })

    const tweet = Tweet.create({
      authorId: userWhoMakeTweet.id,
      content: 'That is a very good tweet',
    })

    const anotherUser = User.create({
      email: 'komero_miyamada@gmail.com',
      username: 'Komero Miyamada',
    })

    const like = LikeATweet.execute({
      tweet: tweet,
      userWhoLikes: anotherUser,
      timestamp: new Date().toISOString(),
    })

    expect(like.tweetId.value).toBe(tweet.id.value)
    expect(like.userId.value).toBe(anotherUser.id.value)
  })
})
