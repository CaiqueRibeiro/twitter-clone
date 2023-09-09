import { Tweet } from '@domain/tweets/entities/tweet'
import { User } from '@domain/users/entities/user'
import { UserId } from '@domain/users/value-objects/user-id'
import { Tweet as PrismaTweet, User as PrismaUser } from '@prisma/client'

type FullTweetPrismaProps = PrismaTweet & {
  referred_tweet?: PrismaTweet
}

type FullTweetWithAuthorPrismaProps = PrismaTweet & {
  referred_tweet?: PrismaTweet
  user: PrismaUser
}

class TweetMapper {
  public static toPrisma(tweet: Tweet) {
    const map = {
      tweet: {
        id: tweet.id.value,
        content: tweet.content,
        active: tweet.isActive,
        created_at: tweet.createdAt,
        updated_at: tweet.updatedAt,
      },
      author: {
        id: tweet.authorId.value,
        email: 'zezinho@gmail.com',
        username: 'ZezinhoTangamandápio',
      },
      referred_tweet: tweet.referredTweet
        ? {
            id: tweet.referredTweet?.id.value,
            author_id: tweet.referredTweet?.authorId.value,
            content: tweet.referredTweet?.content,
            active: tweet.referredTweet?.isActive,
            created_at: tweet.referredTweet?.createdAt,
            updated_at: tweet.referredTweet?.updatedAt,
          }
        : undefined,
    }

    return map
  }

  public static toEntity(input: FullTweetPrismaProps): Tweet {
    let referredTweet: Tweet

    if (input.referred_tweet) {
      referredTweet = Tweet.create({
        id: input.referred_tweet.id,
        authorId: new UserId(input.referred_tweet.author_id),
        content: input.referred_tweet.content,
        isActive: input.referred_tweet.active,
        createdAt: input.referred_tweet.created_at.toISOString(),
        updatedAt: input.referred_tweet.updated_at.toISOString(),
      })
    }

    const tweet = Tweet.create({
      id: input.id,
      authorId: new UserId(input.author_id),
      content: input.content,
      isActive: input.active,
      createdAt: input.created_at.toISOString(),
      updatedAt: input.updated_at.toISOString(),
      referredTweet: input.referred_tweet ? referredTweet : undefined,
    })

    return tweet
  }

  public static toEntityWithAuthor(
    input: FullTweetWithAuthorPrismaProps,
  ): Tweet {
    let referredTweet: Tweet

    if (input.referred_tweet) {
      referredTweet = Tweet.create({
        id: input.referred_tweet.id,
        authorId: new UserId(input.referred_tweet.author_id),
        content: input.referred_tweet.content,
        isActive: input.referred_tweet.active,
        createdAt: input.referred_tweet.created_at.toISOString(),
        updatedAt: input.referred_tweet.updated_at.toISOString(),
      })
    }

    const user = User.create({
      id: input.user.id,
      username: input.user.username,
      email: input.user.email,
      profileImage: input.user.profile_image,
      createdAt: input.user.created_at.toISOString(),
      updatedAt: input.user.updated_at.toISOString(),
    })

    const tweet = Tweet.create({
      id: input.id,
      authorId: new UserId(input.author_id),
      author: user,
      content: input.content,
      isActive: input.active,
      createdAt: input.created_at.toISOString(),
      updatedAt: input.updated_at.toISOString(),
      referredTweet: input.referred_tweet ? referredTweet : undefined,
    })

    return tweet
  }
}

export { TweetMapper }
