import { LikeValidator } from "@domain/tweets/validators/like-validator"
import LikeValidatorFactory from "./like-validator.factory"

describe('LikeValidatorFactory unit tests', () => {
  it('should be able to return a LikeValidator', () => {
    const likeValidator = LikeValidatorFactory.create()
    expect(likeValidator).toBeInstanceOf(LikeValidator)
  })
})
