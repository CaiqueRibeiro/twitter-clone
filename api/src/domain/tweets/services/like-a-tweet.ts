import { User } from "@domain/users/entities/user";
import { Tweet } from "../entities/tweet";

class LikeATweet {
  public static execute(tweet: Tweet, userWhoLikes: User) {}
}

export { LikeATweet }
