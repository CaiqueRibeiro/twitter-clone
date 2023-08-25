import EntityValidator from '@domain/@shared/entity-validator'
import { User } from '@domain/users/entities/user'
import { UserValidator } from '@domain/users/validators/user-validator'

export default class UserValidatorFactory {
  static create(): EntityValidator<User> {
    return new UserValidator()
  }
}
