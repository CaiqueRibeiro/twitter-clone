import { WrongCredentialsError } from './wrong-credentials.error'

describe('WrongCredentialsError', () => {
  it('should create a WrongCredentialsError with default message', () => {
    const error = new WrongCredentialsError()
    expect(error.message).toBe('Email or password are invalid')
  })

  it('should create a WrongCredentialsError with a custom message', () => {
    const error = new WrongCredentialsError('Credentials are invalid')
    expect(error.message).toBe('Credentials are invalid')
  })
})
