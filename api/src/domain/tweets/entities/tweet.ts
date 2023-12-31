import { AggregateRoot } from '@domain/@shared/aggregate-root'
import { TweetId } from '../value-objects/tweet-id'
import { UserId } from '@domain/users/value-objects/user-id'
import NotificationError from '@domain/@shared/notification/notification-error'
import TweetValidatorFactory from '../factories/validators/tweet-validator.factory'
import { User } from '@domain/users/entities/user'

interface TweetProps {
  id: TweetId
  authorId: UserId
  author?: User
  content: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  referredTweet?: Tweet
}

interface TweetConstructorProps {
  id?: TweetId | string
  authorId: UserId
  author?: User
  content: string
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
  referredTweet?: Tweet
}

class Tweet extends AggregateRoot {
  private _props: TweetProps = {} as TweetProps

  private constructor(props: TweetConstructorProps) {
    super()

    this._props.id =
      typeof props.id === 'string'
        ? new TweetId(props.id)
        : props.id ?? new TweetId()

    this._id = this._props.id // to validate with equals()

    this._props.authorId = props.authorId

    this._props.author = props.author

    this._props.content = props.content
    this._props.createdAt = props.createdAt
      ? new Date(props.createdAt)
      : new Date()
    this._props.updatedAt = props.updatedAt
      ? new Date(props.updatedAt)
      : this._props.createdAt
    this._props.isActive = props.isActive ?? true

    this._props.referredTweet = props.referredTweet
  }

  public static create(input: TweetConstructorProps): Tweet {
    const tweet = new Tweet(input)
    tweet.validate()
    return tweet
  }

  get id() {
    return this._props.id
  }

  public validate() {
    TweetValidatorFactory.create().validate(this)
    if (this._notification.hasErrors()) {
      throw new NotificationError(this._notification.getErrors())
    }
  }

  get authorId() {
    return this._props.authorId
  }

  get author() {
    return this._props.author
  }

  get content() {
    return this._props.content
  }

  get isActive() {
    return this._props.isActive
  }

  get referredTweet() {
    return this._props.referredTweet
  }

  get createdAt() {
    return this._props.createdAt
  }

  get updatedAt() {
    return this._props.updatedAt
  }

  modifyContent(content: string) {
    this._props.content = content
  }

  delete() {
    this._props.isActive = false
  }

  toJSON() {
    const jsonResponse = {
      id: this._props.id.value,
      authorId: this._props.authorId.value,
      author: this._props.author ? this._props.author.toJSON() : undefined,
      content: this._props.content,
      isActive: this._props.isActive,
      createdAt: this._props.createdAt.toISOString(),
      updatedAt: this._props.createdAt.toISOString(),
      referredTweet: this._props.referredTweet
        ? {
            id: this._props.referredTweet._props.id.value,
            authorId: this._props.referredTweet.authorId.value,
            content: this._props.referredTweet.content,
            isActive: this._props.referredTweet.isActive,
            createdAt: this._props.referredTweet.createdAt.toISOString(),
            updatedAt: this._props.referredTweet.createdAt.toISOString(),
          }
        : undefined,
    }

    return jsonResponse
  }
}

export { Tweet }
