import { AggregateRoot } from '@domain/@shared/aggregate-root'
import NotificationError from '@domain/@shared/notification/notification-error'
import { Tweet } from './tweet'
import { FeedId } from '../value-objects/feed-id'
import { UserId } from '@domain/users/value-objects/user-id'

interface FeedProps {
  id: FeedId
  tweets: Tweet[]
  userId: UserId
}

interface FeedConstructorProps {
  id?: FeedId | string
  tweets: Tweet[]
  userId: UserId
}

class Feed extends AggregateRoot {
  private _props: FeedProps = {} as FeedProps

  private constructor(props: FeedConstructorProps) {
    super()

    this._props.id =
      typeof props.id === 'string'
        ? new FeedId(props.id)
        : props.id ?? new FeedId()

    this._id = this._props.id // to validate with equals()
    this._props.tweets = props.tweets
  }

  public static create(input: FeedConstructorProps): Feed {
    const feed = new Feed(input)
    feed.validate()
    return feed
  }

  get id() {
    return this._props.id
  }

  public validate() {
    FeedValidatorFactory.create().validate(this)
    if (this._notification.hasErrors()) {
      throw new NotificationError(this._notification.getErrors())
    }
  }

  get tweets() {
    return this._props.tweets
  }

  get userId() {
    return this._props.userId
  }

  toJSON() {
    const jsonResponse = {
      id: this._props.id.value,
      userId: this._props.userId.value,
      tweets: this._props.tweets.map(tweet => tweet.toJSON()),
    }

    return jsonResponse
  }
}

export { Feed }
