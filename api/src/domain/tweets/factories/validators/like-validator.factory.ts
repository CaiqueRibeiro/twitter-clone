import EntityValidator from '@domain/@shared/entity-validator'
import { LikeValidator } from '@domain/tweets/validators/like-validator'
import { Like } from '@domain/tweets/value-objects/like'

export default class LikeValidatorFactory {
  static create(): EntityValidator<Like> {
    return new LikeValidator()
  }
}
