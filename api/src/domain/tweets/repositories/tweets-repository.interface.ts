import { Feed } from '../entities/feed'
import { Reply } from '../entities/reply'
import { Tweet } from '../entities/tweet'
import { Like } from '../value-objects/like'
import { TweetId } from '../value-objects/tweet-id'

export interface TweetsRepositoryInterface {
  create(input: Tweet): Promise<void>
  findById(tweetId: TweetId | string): Promise<Tweet | null>
  findAllByAuthorId({
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
  }): Promise<Tweet[]>
  findFeedByFollowerId(followerId: string): Promise<Feed | null>
  addLike(like: Like): Promise<void>
  reply(reply: Reply): Promise<void>
}
