import { CyclicFollowOperationError } from './cyclic-follow-operation.error'

describe('CyclicFollowOperationError', () => {
  it('should create a CyclicFollowOperationError with default message', () => {
    const error = new CyclicFollowOperationError()
    expect(error.message).toBe('You cannot follow your own profile')
  })

  it('should create a CyclicFollowOperationError with a custom message', () => {
    const error = new CyclicFollowOperationError(
      'You are trying to follow yourself',
    )
    expect(error.message).toBe('You are trying to follow yourself')
  })
})
