import { Tweet } from '@domain/tweets/entities/tweet'
import { TweetsRepositoryInterface } from '../tweets-repository.interface'
import { TweetId } from '@domain/tweets/value-objects/tweet-id'
import { Feed } from '@domain/tweets/entities/feed'
import { Like } from '@domain/tweets/value-objects/like'
import { UserId } from '@domain/users/value-objects/user-id'
import { Reply } from '@domain/tweets/entities/reply'

class FakeTweetsRepository implements TweetsRepositoryInterface {
  public tweets: Tweet[]
  public feeds: Feed[]
  public likes: Like[]

  constructor() {
    this.tweets = []
    this.feeds = []
    this.likes = []
  }

  async create(input: Tweet): Promise<void> {
    this.tweets.push(input)
  }

  async findById(tweetId: string | TweetId): Promise<Tweet | null> {
    let id: TweetId
    if (!(tweetId instanceof TweetId)) {
      id = new TweetId(tweetId)
    }
    const tweet = this.tweets.find(tweet => tweet.id.equals(id))
    if (!tweet) return null
    return tweet
  }

  async findAllByAuthorId({
    authorId,
  }: {
    authorId: string
    limit?: number
    page?: number
    orderBy?: string
    order?: string
  }): Promise<Tweet[]> {
    const authorTweets = this.tweets.filter(
      tweet => tweet.authorId.value === authorId,
    )
    return authorTweets
  }

  async findFeedByFollowerId(followerId: string): Promise<Feed | null> {
    const userId = new UserId(followerId)
    const feed = this.feeds.find(feed => feed.userId.equals(userId))
    if (!feed) return null
    return feed
  }

  async addLike(like: Like): Promise<void> {
    this.likes.push(like)
  }

  reply(reply: Reply): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

export { FakeTweetsRepository }
