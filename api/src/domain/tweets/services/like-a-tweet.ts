import { User } from "@domain/users/entities/user"
import { Tweet } from "../entities/tweet"
import { Like } from "../value-objects/like"
import { CyclicLikeOperationError } from "../errors/cyclic-like-operation.error"

interface LikeATweetProps {
  tweet: Tweet;
  userWhoLikes: User;
}

class LikeATweet {
  public static execute({ tweet, userWhoLikes }: LikeATweetProps): Like {
    if(tweet.authorId.equals(userWhoLikes.id)) {
      throw new CyclicLikeOperationError('You cannot like your own tweet')
    }

    const like = Like.create({
      tweetId: tweet.id,
      userId: userWhoLikes.id,
      timestamp: new Date()
    })

    return like
  }
}

export { LikeATweet }
