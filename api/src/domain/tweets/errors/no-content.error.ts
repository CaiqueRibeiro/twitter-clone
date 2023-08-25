class NoContentError extends Error {
  constructor(message = 'You cannot post or reply a tweet without a content') {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
    this.message = message
  }
}

export { NoContentError }
