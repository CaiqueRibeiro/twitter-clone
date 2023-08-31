import { DuplicateFollowingError } from './duplicate-following.error'

describe('DuplicateFollowingError', () => {
  it('should create a DuplicateFollowingError with default message', () => {
    const error = new DuplicateFollowingError()
    expect(error.message).toBe('You already follows this user')
  })

  it('should create a DuplicateFollowingError with a custom message', () => {
    const error = new DuplicateFollowingError(
      'You cannot follow same user twice',
    )
    expect(error.message).toBe('You cannot follow same user twice')
  })
})
