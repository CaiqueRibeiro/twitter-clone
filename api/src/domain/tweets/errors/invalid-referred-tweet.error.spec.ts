import { InvalidReferredTweetError } from "./invalid-referred-tweet.error"

describe('ConflictError', () => {
  it('should create a InvalidReferredTweetError with default message', () => {
    const error = new InvalidReferredTweetError()
    expect(error.message).toBe('This referred tweet does not exist or was deleted')
  });

  it('should create a CyclicLikeOperationError with a custom message', () => {
    const error = new InvalidReferredTweetError('this tweets does not exist')
    expect(error.message).toBe('this tweets does not exist')
  });
});
