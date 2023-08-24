import { UserNotFoundError } from './user-not-found.error'

describe('UserNotFoundError', () => {
  it('should create a UserNotFoundError with default message', () => {
    const error = new UserNotFoundError()
    expect(error.message).toBe('User not found')
  })

  it('should create a UserNotFoundError with a custom message', () => {
    const error = new UserNotFoundError('this user does not exist')
    expect(error.message).toBe('this user does not exist')
  })
})
