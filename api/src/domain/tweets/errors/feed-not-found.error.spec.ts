import { FeedNotFoundError } from './feed-not-found.error'

describe('FeedNotFoundError', () => {
  it('should create a FeedNotFoundError with default message', () => {
    const error = new FeedNotFoundError()
    expect(error.message).toBe('Feed not found')
  })

  it('should create a FeedNotFoundError with a custom message', () => {
    const error = new FeedNotFoundError('this feed does not exist')
    expect(error.message).toBe('this feed does not exist')
  })
})
