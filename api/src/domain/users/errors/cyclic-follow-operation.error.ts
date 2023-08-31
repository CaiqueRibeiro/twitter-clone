class CyclicFollowOperationError extends Error {
  constructor(message = 'You cannot follow your own profile') {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
    this.message = message
  }
}

export { CyclicFollowOperationError }
