class DuplicateFollowingError extends Error {
  constructor(message = 'You already follows this user') {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
    this.message = message
  }
}

export { DuplicateFollowingError }
