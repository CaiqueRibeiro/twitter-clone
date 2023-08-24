class TweetNotFoundError extends Error {
  constructor(message = 'Tweet not found') {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
    this.message = message
  }
}

export { TweetNotFoundError }
