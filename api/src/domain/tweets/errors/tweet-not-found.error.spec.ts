import { TweetNotFoundError } from './tweet-not-found.error'

describe('ConflictError', () => {
  it('should create a TweetNotFoundError with default message', () => {
    const error = new TweetNotFoundError()
    expect(error.message).toBe('Tweet not found')
  })

  it('should create a CyclicLikeOperationError with a custom message', () => {
    const error = new TweetNotFoundError('this tweet does not exist')
    expect(error.message).toBe('this tweet does not exist')
  })
})
