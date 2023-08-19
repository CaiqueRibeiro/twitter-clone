import { Tweet } from '@domain/tweets/entities/tweet'
import { TweetsRepositoryInterface } from '../tweets-repository.interface'
import { TweetId } from '@domain/tweets/value-objects/tweet-id'

class FakeTweetsRepository implements TweetsRepositoryInterface {
  public tweets: Tweet[]

  constructor() {
    this.tweets = []
  }

  async create(input: Tweet): Promise<void> {
    this.tweets.push(input)
  }

  async findById(tweetId: string | TweetId): Promise<Tweet | null> {
    let id: TweetId
    if(!(tweetId instanceof TweetId)) {
      id = new TweetId(tweetId)
    }
    const tweet = this.tweets.find(tweet => tweet.id.equals(id))
    if(!tweet) return null
    return tweet
  }


  async findAllByAuthorId({ authorId, page, limit, orderBy, order }: { authorId: string; limit?: number; page?: number; orderBy?: string; order?: string }): Promise<Tweet[]> {
    const authorTweets = this.tweets.filter(tweet => tweet.authorId.value === authorId)
    return authorTweets
  }

}

export { FakeTweetsRepository }
