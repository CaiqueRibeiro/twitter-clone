import { Feed } from '@domain/tweets/entities/feed'
import { UserId } from '@domain/users/value-objects/user-id'
import { Tweet as PrismaTweet, Feed as PrismaFeed, User } from '@prisma/client'
import { TweetMapper } from './tweet-mapper'

type FullFeedPrismaProps = PrismaFeed & {
  feed_tweets: {
    tweet_id: string
    feed_id: string
    tweet: PrismaTweet & {
      user: User
    }
  }[]
}

class FeedMapper {
  public static toEntity(input: FullFeedPrismaProps): Feed {
    const feed = Feed.create({
      id: input.id,
      userId: new UserId(input.user_id),
      tweets: input.feed_tweets.map(feedTweet => {
        const tweet = TweetMapper.toEntityWithAuthor(feedTweet.tweet)
        return tweet
      }),
    })

    return feed
  }
}

export { FeedMapper }
