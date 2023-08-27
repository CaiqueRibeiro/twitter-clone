class UsernameAlreadyInUseError extends Error {
  constructor(message = 'This username is already in use') {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
    this.message = message
  }
}

export { UsernameAlreadyInUseError }
