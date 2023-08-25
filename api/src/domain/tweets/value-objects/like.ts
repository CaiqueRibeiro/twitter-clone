import NotificationError from '@domain/@shared/notification/notification-error'
import { TweetId } from '../value-objects/tweet-id'
import { ValueObject } from '@domain/@shared/value-object'
import { UserId } from '@domain/users/value-objects/user-id'
import LikeValidatorFactory from '../factories/validators/like-validator.factory'

interface LikeProps {
  tweetId: TweetId
  userId: UserId
  timestamp: Date
}

interface LikeConstructorProps {
  tweetId: TweetId
  userId: UserId
  timestamp?: Date
}

class Like extends ValueObject<LikeProps> {
  private constructor(props: LikeConstructorProps) {
    super({
      ...props,
      timestamp: props.timestamp ? new Date(props.timestamp) : new Date(),
    })
  }

  public static create(input: LikeConstructorProps): Like {
    const like = new Like(input)
    like.validate()
    return like
  }

  public validate() {
    LikeValidatorFactory.create().validate(this)
    if (this._notification.hasErrors()) {
      throw new NotificationError(this._notification.getErrors())
    }
  }

  get tweetId(): TweetId {
    return this._value.tweetId
  }

  get userId(): UserId {
    return this._value.userId
  }

  get timestamp(): Date {
    return this._value.timestamp
  }

  toJSON() {
    return {
      tweetId: this._value.tweetId.value,
      userId: this._value.userId.value,
      timestamp: this._value.timestamp.toISOString(),
    }
  }
}

export { Like }
