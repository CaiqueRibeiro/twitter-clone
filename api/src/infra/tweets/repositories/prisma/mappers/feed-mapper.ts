import { Tweet } from "@domain/tweets/entities/tweet"
import { Feed } from "@domain/tweets/entities/feed"
import { UserId } from "@domain/users/value-objects/user-id"
import { Tweet as PrismaTweet, Feed as PrismaFeed, FeedTweet } from "@prisma/client"

type FullFeedPrismaProps = PrismaTweet & {
 : PrismaTweet
}

class FeedMapper {
  public static toEntity(input: FullTweetPrismaProps): Feed {
    const feed = Feed.create({})

    return feed
  }
}

export { FeedMapper }
