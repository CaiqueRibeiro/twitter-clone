import { CyclicLikeOperationError } from './cyclic-like-operation.error'

describe('ConflictError', () => {
  it('should create a CyclicLikeOperationError with default message', () => {
    const error = new CyclicLikeOperationError()
    expect(error.message).toBe('You cannot like your own tweet')
  });

  it('should create a CyclicLikeOperationError with a custom message', () => {
    const error = new CyclicLikeOperationError('You are not allowed to like your own tweet')
    expect(error.message).toBe('You are not allowed to like your own tweet')
  });
});
