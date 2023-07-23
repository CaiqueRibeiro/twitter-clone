import { Tweet } from '@domain/tweets/entities/tweet'
import { TweetsRepositoryInterface } from '../tweets-repository.interface'

class FakeTweetsRepository implements TweetsRepositoryInterface {
  public tweets: Tweet[]

  constructor() {
    this.tweets = []
  }

  async create(input: Tweet): Promise<void> {
    this.tweets.push(input)
  }
  
  async findAllByAuthorId(authorId: string): Promise<Tweet[]> {
    const authorTweets = this.tweets.filter(tweet => tweet.authorId.value === authorId)
    return authorTweets
  }
}

export { FakeTweetsRepository }