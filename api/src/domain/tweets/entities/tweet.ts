import { AggregateRoot } from "@domain/@shared/aggregate-root"
import { TweetId } from "../value-objects/tweet-id"
import { UserId } from "@domain/users/value-objects/user-id"
import NotificationError from "@domain/@shared/notification/notification-error";
import TweetValidatorFactory from "../factories/validators/TweetValidatorFactory";

interface TweetProps {
  id: TweetId;
  authorId: UserId;
  content: string;
  timestamp: Date;
  active: boolean;
}

interface TweetConstructorProps {
  id?: TweetId | string;
  authorId: UserId | string;
  content: string;
  timestamp: string;
}

class Tweet extends AggregateRoot {
  private props: TweetProps = {} as TweetProps

  private constructor(props: TweetConstructorProps) {
    super()
    this.props.id =
    typeof props.id === 'string' ?
    new TweetId(props.id)
    : props.id ?? new TweetId()
    this.props.authorId =
    typeof props.authorId === 'string' ?
    new UserId(props.authorId)
    : props.authorId ?? new UserId()
    this.props.content = props.content
    this.props.timestamp = new Date(props.timestamp)
    this.props.active = true
  }

  public static create(input: TweetConstructorProps): Tweet {
    const tweet = new Tweet(input)
    tweet.validate()
    return tweet
  }

  get id() {
    return this.props.id
  }

  public validate() {
    TweetValidatorFactory.create().validate(this);
    if (this._notification.hasErrors()) {
      throw new NotificationError(this._notification.getErrors())
    }
  }

  get authorId() {
    return this.props.authorId
  }

  get content() {
    return this.props.content
  }

  get timestamp() {
    return this.props.timestamp
  }

  delete() {
    this.props.active = false
  }

  toJSON() {
    return {
      id: this.props.id,
      authorId: this.props.authorId,
      content: this.props.content,
      timestamp: this.props.timestamp.toISOString(),
      active: this.props.active
    }
  }
}

export { Tweet }