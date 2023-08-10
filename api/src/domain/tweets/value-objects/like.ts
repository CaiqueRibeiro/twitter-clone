import { TweetId } from "../value-objects/tweet-id"
import { ValueObject } from "@domain/@shared/value-object"
import { UserId } from "@domain/users/value-objects/user-id"


interface LikeProps {
  tweetId: TweetId;
  userId: UserId;
  timestamp: Date;
}

interface LikeConstructorProps {
  tweetId: TweetId;
  userId: UserId;
  timestamp?: Date;
}

class Like extends ValueObject<LikeProps> {
  private _props: LikeProps = {} as LikeProps

  private constructor(props: LikeConstructorProps) {
    super({
      ...props,
      timestamp: props.timestamp ? new Date(props.timestamp) : new Date()
    })
  }

  get tweetId(): TweetId {
    return this._props.tweetId
  }

  get userId(): UserId {
    return this._props.userId
  }

  get timestamp(): Date {
    return this._props.timestamp
  }

  toJSON() {
    return {
      tweetId: this._props.tweetId.value,
      userId: this._props.userId.value,
      timestamp: this._props.timestamp.toISOString()
    }
  }
}

export { Like }
