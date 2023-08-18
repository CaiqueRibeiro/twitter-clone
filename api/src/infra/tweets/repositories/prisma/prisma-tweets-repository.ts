import { prisma } from "@config/prisma"
import { Tweet } from "@domain/tweets/entities/tweet"
import { TweetsRepositoryInterface } from "@domain/tweets/repositories/tweets-repository.interface"
import { TweetMapper } from "./mappers/tweet-mapper"

class PrismaTweetsRepository implements TweetsRepositoryInterface {
  async  create(input: Tweet): Promise<void> {
    const raw = TweetMapper.toPrisma(input)
    await prisma.tweet.create({
      data: { ...raw.tweet }
    });
  }

  async findAllByAuthorId({ authorId, page = 1, limit = 50, orderBy = 'name', order = 'asc' }: { authorId: string, limit?: number, page?: number, orderBy?: string, order?: string }): Promise<Tweet[]> {
    limit = Math.abs(limit);
    page = page !== 0 ? Math.abs(page) : 1;
    order = order !== 'asc' && order !== 'desc' ? 'asc' : order;
    const OFFSET = limit ? (page - 1) * limit : 0;

    const raw = await prisma.tweet.findMany({
      skip: OFFSET,
      take: limit,
      where: {
        author_id: authorId,
      },
      include: {
        referred_tweet: true
      },
      orderBy: {
        [orderBy]: order,
      }
    })

    const tweets = raw.map(tweet => TweetMapper.toEntity(tweet));
    return tweets;
  }
}

export { PrismaTweetsRepository }
