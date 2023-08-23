import { User } from "@domain/users/entities/user"
import { Tweet } from "../entities/tweet"
import { Like } from "../value-objects/like"
import { CyclicLikeOperationError } from "../errors/cyclic-like-operation.error"

interface LikeATweetProps {
  tweet: Tweet;
  userWhoLikes: User;
  timestamp: string;
}

class LikeATweet {

  public static execute({ tweet, userWhoLikes, timestamp }: LikeATweetProps): Like {
    if(tweet.authorId.equals(userWhoLikes.id)) {
      throw new CyclicLikeOperationError()
    }

    const like = Like.create({
      tweetId: tweet.id,
      userId: userWhoLikes.id,
      timestamp: new Date(timestamp)
    })

    return like
  }
}

export { LikeATweet }
