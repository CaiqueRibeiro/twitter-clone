import { Tweet } from "../entities/tweet"
import { TweetId } from "../value-objects/tweet-id"

export interface TweetsRepositoryInterface {
  create(input: Tweet): Promise<void>
  findById(tweetId: TweetId | string): Promise<Tweet | null>
  findAllByAuthorId({ authorId, page = 1, limit = 50, orderBy = 'name', order = 'asc' }: { authorId: string, limit?: number, page?: number, orderBy?: string, order?: string }): Promise<Tweet[]>;
  findAllByFollowerId(followerId: string): Promise<Tweet[]>
}
