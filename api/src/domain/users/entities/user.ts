import { AggregateRoot } from '@domain/@shared/aggregate-root'
import { UserId } from '../value-objects/user-id'
import NotificationError from '@domain/@shared/notification/notification-error'
import UserValidatorFactory from '../factories/validators/user-validator.factory'

interface UserProps {
  id: UserId
  email: string
  username: string
  profileImage: string
  createdAt: Date
  updatedAt: Date
}

interface UserConstructorProps {
  id?: UserId | string
  email: string
  username: string
  profileImage?: string
  createdAt?: string
  updatedAt?: string
}

class User extends AggregateRoot {
  private _props: UserProps = {} as UserProps

  private constructor(props: UserConstructorProps) {
    super()

    this._props.id =
      typeof props.id === 'string'
        ? new UserId(props.id)
        : props.id ?? new UserId()

    this._id = this._props.id // to validate with equals()

    this._props.email = props.email
    this._props.username = props.username
    this._props.profileImage = props.profileImage || ''

    this._props.createdAt = props.createdAt
      ? new Date(props.createdAt)
      : new Date()
    this._props.updatedAt = props.updatedAt
      ? new Date(props.updatedAt)
      : this._props.createdAt
  }

  public static create(input: UserConstructorProps): User {
    const tweet = new User(input)
    tweet.validate()
    return tweet
  }

  get id() {
    return this._props.id
  }

  get email() {
    return this._props.email
  }

  get username() {
    return this._props.username
  }

  get profileImage() {
    return this._props.profileImage
  }

  get createdAt() {
    return this._props.createdAt
  }

  get updatedAt() {
    return this._props.updatedAt
  }

  public validate() {
    UserValidatorFactory.create().validate(this)
    if (this._notification.hasErrors()) {
      throw new NotificationError(this._notification.getErrors())
    }
  }

  toJSON() {
    return {
      id: this._props.id,
      email: this._props.email,
      username: this._props.username,
      profileImage: this._props.profileImage,
      createdAt: this._props.createdAt.toISOString(),
      updatedAt: this._props.updatedAt.toISOString(),
    }
  }
}

export { User }
