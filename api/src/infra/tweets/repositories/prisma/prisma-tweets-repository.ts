import { prisma } from '@config/prisma'
import { Tweet } from '@domain/tweets/entities/tweet'
import { TweetsRepositoryInterface } from '@domain/tweets/repositories/tweets-repository.interface'
import { TweetMapper } from './mappers/tweet-mapper'
import { TweetId } from '@domain/tweets/value-objects/tweet-id'
import { FeedMapper } from './mappers/feed-mapper'
import { Feed } from '@domain/tweets/entities/feed'

class PrismaTweetsRepository implements TweetsRepositoryInterface {
  async create(input: Tweet): Promise<void> {
    const raw = TweetMapper.toPrisma(input)
    await prisma.tweet.create({
      data: {
        ...raw.tweet,
        user: {
          connectOrCreate: {
            where: {
              id: raw.author.id,
            },
            create: raw.author,
          },
        },
      },
    })
  }

  async findById(tweetId: string | TweetId): Promise<Tweet | null> {
    const tweet = await prisma.tweet.findUnique({
      where: {
        id: tweetId instanceof TweetId ? tweetId.value : tweetId,
      },
    })

    if (!tweet) return null

    return TweetMapper.toEntity(tweet)
  }

  async findAllByAuthorId({
    authorId,
    page = 1,
    limit = 50,
    orderBy = 'name',
    order = 'asc',
  }: {
    authorId: string
    limit?: number
    page?: number
    orderBy?: string
    order?: string
  }): Promise<Tweet[]> {
    limit = Math.abs(limit)
    page = page !== 0 ? Math.abs(page) : 1
    order = order !== 'asc' && order !== 'desc' ? 'asc' : order
    const OFFSET = limit ? (page - 1) * limit : 0

    const raw = await prisma.tweet.findMany({
      skip: OFFSET,
      take: limit,
      where: {
        author_id: authorId,
      },
      include: {
        referred_tweet: true,
      },
      orderBy: {
        [orderBy]: order,
      },
    })

    const tweets = raw.map(tweet => TweetMapper.toEntity(tweet))
    return tweets
  }

  async findFeedByFollowerId(followerId: string): Promise<Feed | null> {
    const raw = await prisma.feed.findUnique({
      where: {
        user_id: followerId,
      },
      include: {
        feed_tweets: {
          include: {
            tweet: true,
          },
        },
      },
    })

    if (!raw) return null
    const feed = FeedMapper.toEntity(raw)
    return feed
  }
}

export { PrismaTweetsRepository }
