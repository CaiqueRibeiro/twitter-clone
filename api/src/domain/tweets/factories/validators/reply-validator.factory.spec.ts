import { ReplyValidator } from "@domain/tweets/validators/reply-validator"
import ReplyValidatorFactory from "./reply-validator.factory"

describe('ReplyValidatorFactory unit tests', () => {
  it('should be able to return a ReplyValidator', () => {
    const replyValidator = ReplyValidatorFactory.create()
    expect(replyValidator).toBeInstanceOf(ReplyValidator)
  })
})
