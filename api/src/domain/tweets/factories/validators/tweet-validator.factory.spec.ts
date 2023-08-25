import { TweetValidator } from '@domain/tweets/validators/tweet-validator'
import TweetValidatorFactory from './tweet-validator.factory'

describe('TweetValidatorFactory unit tests', () => {
  it('should be able to return a TweetValidator', () => {
    const tweetValidator = TweetValidatorFactory.create()
    expect(tweetValidator).toBeInstanceOf(TweetValidator)
  })
})
