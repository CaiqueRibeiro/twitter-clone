import { UsernameAlreadyInUseError } from './username-already-in-use.error'

describe('UsernameAlreadyInUseError', () => {
  it('should create a UsernameAlreadyInUseError with default message', () => {
    const error = new UsernameAlreadyInUseError()
    expect(error.message).toBe('This username is already in use')
  })

  it('should create a UsernameAlreadyInUseError with a custom message', () => {
    const error = new UsernameAlreadyInUseError(
      'this username is already in use by other account',
    )
    expect(error.message).toBe(
      'this username is already in use by other account',
    )
  })
})
