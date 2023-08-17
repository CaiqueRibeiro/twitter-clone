class CyclicLikeOperationError extends Error {
  constructor(message: string = 'You cannot like your own tweet') {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
    this.message = message
  }
}

export { CyclicLikeOperationError }
