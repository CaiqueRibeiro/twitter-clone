import EntityValidator from '@domain/@shared/entity-validator'
import { Reply } from '@domain/tweets/entities/reply'
import { ReplyValidator } from '@domain/tweets/validators/reply-validator'

export default class ReplyValidatorFactory {
  static create(): EntityValidator<Reply> {
    return new ReplyValidator()
  }
}
