import { Reply } from '@domain/tweets/entities/reply'

class ReplyMapper {
  public static toPrisma(reply: Reply) {
    const map = {
      content: reply.content,
      user_id: reply.userId.value,
      tweet_id: reply.tweetId.value,
      timestamp: reply.timestamp,
    }

    return map
  }
}

export { ReplyMapper }
