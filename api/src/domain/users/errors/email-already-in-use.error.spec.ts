import { EmailAlreadyInUseError } from './email-already-in-use.error'

describe('EmailAlreadyInUseError', () => {
  it('should create a EmailAlreadyInUseError with default message', () => {
    const error = new EmailAlreadyInUseError()
    expect(error.message).toBe('This email is already in use')
  })

  it('should create a EmailAlreadyInUseError with a custom message', () => {
    const error = new EmailAlreadyInUseError(
      'this email is already in use by other account',
    )
    expect(error.message).toBe('this email is already in use by other account')
  })
})
