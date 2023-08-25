import { User } from '@domain/users/entities/user'
import { Tweet } from '../entities/tweet'
import { Reply } from '../entities/reply'
import { NoContentError } from '../errors/no-content.error'

interface ReplyATweetProps {
  content: string
  tweet: Tweet
  user: User
  timestamp: string
}

class ReplyATweet {
  public static execute({
    content,
    tweet,
    user,
    timestamp,
  }: ReplyATweetProps): Reply {
    if (!content) throw new NoContentError()

    const reply = Reply.create({
      content: content,
      tweetId: tweet.id,
      userId: user.id,
      timestamp: new Date(timestamp),
    })

    return reply
  }
}

export { ReplyATweet }
