import { Tweet } from "@domain/tweets/entities/tweet"
import { UserId } from "@domain/users/value-objects/user-id"
import { Tweet as PrismaTweet } from "@prisma/client"

type FullTweetPrismaProps = PrismaTweet & {
  referred_tweet?: PrismaTweet
}

class TweetMapper {
  public static toPrisma(tweet: Tweet) {
    const map = {
      tweet: {
        id: tweet.id.value,
        author_id: tweet.authorId.value,
        content: tweet.content,
        active: tweet.isActive,
        created_at: tweet.createdAt,
        updated_at: tweet.updatedAt,
      },
      referred_tweet: {
        id: tweet.referredTweet?.id.value,
        author_id: tweet.referredTweet?.authorId.value,
        content: tweet.referredTweet?.content,
        active: tweet.referredTweet?.isActive,
        created_at: tweet.referredTweet?.createdAt,
        updated_at: tweet.referredTweet?.updatedAt,
      }
    }

    return map
  }

  public static toEntity(input: FullTweetPrismaProps): Tweet {
    let referredTweet: Tweet

    if(input.referred_tweet) {
      referredTweet = Tweet.create({
        id: input.referred_tweet.id,
        authorId: new UserId(input.referred_tweet.author_id),
        content: input.referred_tweet.content,
        isActive: input.referred_tweet.active,
        createdAt: input.referred_tweet.created_at.toISOString(),
        updatedAt: input.referred_tweet.updated_at.toISOString()
      })
    }

    const tweet = Tweet.create({
      id: input.id,
      authorId: new UserId(input.author_id),
      content: input.content,
      isActive: input.active,
      createdAt: input.created_at.toISOString(),
      updatedAt: input.updated_at.toISOString(),
      referredTweet: referredTweet,
    })

    return tweet
  }
}

export { TweetMapper }
