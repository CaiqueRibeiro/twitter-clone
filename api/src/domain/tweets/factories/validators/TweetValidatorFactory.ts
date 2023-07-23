import EntityValidator from "@domain/@shared/entity-validator"
import { Tweet } from "@domain/tweets/entities/tweet"
import { TweetValidator } from "@domain/tweets/validators/TweetValidator"


export default class TweetValidatorFactory {
  static create(): EntityValidator<Tweet> {
    return new TweetValidator()
  }
}