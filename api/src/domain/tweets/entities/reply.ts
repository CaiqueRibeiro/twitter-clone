import { AggregateRoot } from "@domain/@shared/aggregate-root"
import { UserId } from "@domain/users/value-objects/user-id";
import { ReplyId } from "../value-objects/reply-id";
import { TweetId } from "../value-objects/tweet-id";
import NotificationError from "@domain/@shared/notification/notification-error";
import ReplyValidatorFactory from "../factories/validators/ReplyValidatorFactory";

interface ReplyProps {
  id: ReplyId;
  tweetId: TweetId;
  userId: UserId;
  content: string;
  timestamp: Date;
}

interface ReplyConstructorProps {
  id?: ReplyId | string;
  tweetId: TweetId;
  userId: UserId;
  content: string;
  timestamp?: Date;
}

class Reply extends AggregateRoot {
  private _props: ReplyProps = {} as ReplyProps

  constructor(props: ReplyConstructorProps) {
    super()

    this._props.id =
    typeof props.id === 'string' ?
    new ReplyId(props.id)
    : props.id ?? new ReplyId()

    this._props.tweetId = props.tweetId
    this._props.userId = props.userId

    this._props.content = props.content
    this._props.timestamp = props.timestamp ? new Date(props.timestamp) : new Date()
  }

  public static create(input: ReplyConstructorProps): Reply {
    const reply = new Reply(input)
    reply.validate()
    return reply
  }

  public validate() {
    ReplyValidatorFactory.create().validate(this);
    if (this._notification.hasErrors()) {
      throw new NotificationError(this._notification.getErrors())
    }
  }

  get id() {
    return this._props.id
  }

  get tweetId(): TweetId {
    return this._props.tweetId
  }

  get userId(): UserId {
    return this._props.userId
  }

  get content() {
    return this._props.content
  }

  get timestamp(): Date {
    return this._props.timestamp
  }

  toJSON() {
    return {
      id: this._props.id.value,
      tweetId: this._props.tweetId.value,
      userId: this._props.userId.value,
      content: this._props.content,
      timestamp: this._props.timestamp.toISOString()
    }
  }
}

export { Reply }
