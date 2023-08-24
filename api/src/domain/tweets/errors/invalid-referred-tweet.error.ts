class InvalidReferredTweetError extends Error {
  constructor(message = 'This referred tweet does not exist or was deleted') {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
    this.message = message
  }
}

export { InvalidReferredTweetError }
