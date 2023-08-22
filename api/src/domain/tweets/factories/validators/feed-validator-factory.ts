import EntityValidator from "@domain/@shared/entity-validator"
import { Feed } from "@domain/tweets/entities/feed"
import { FeedValidator } from "@domain/tweets/validators/feed-validator"


export default class FeedValidatorFactory {
  static create(): EntityValidator<Feed> {
    return new FeedValidator()
  }
}
