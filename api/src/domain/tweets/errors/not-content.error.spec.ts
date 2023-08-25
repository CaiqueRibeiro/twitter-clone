import { NoContentError } from './no-content.error'

describe('NoContentError', () => {
  it('should create a NoContentError with default message', () => {
    const error = new NoContentError()
    expect(error.message).toBe(
      'You cannot post or reply a tweet without a content',
    )
  })

  it('should create a NoContentError with a custom message', () => {
    const error = new NoContentError('it has no content to be used')
    expect(error.message).toBe('it has no content to be used')
  })
})
