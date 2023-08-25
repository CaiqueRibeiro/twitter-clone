import { Like } from '@domain/tweets/value-objects/like'

class LikeMapper {
  public static toPrisma(like: Like) {
    const map = {
      timestamp: like.timestamp,
      user_id: like.userId.value,
      tweet_id: like.tweetId.value,
    }

    return map
  }
}

export { LikeMapper }
