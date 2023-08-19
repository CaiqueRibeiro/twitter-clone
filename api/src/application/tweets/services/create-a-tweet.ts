import { injectable, inject } from "tsyringe";
import { UserId } from "@domain/users/value-objects/user-id"
import { TweetsRepositoryInterface } from "@domain/tweets/repositories/tweets-repository.interface";
import { Tweet } from "@domain/tweets/entities/tweet";
import { InvalidReferredTweetError } from "@domain/tweets/errors/invalid-referred-tweet.error";

interface CreateATweetProps {
  authorId: string;
  content: string;
  timestamp: string;
  referredTweetId?: string;
}

@injectable()
class CreateATweet {
  constructor(
    @inject('TweetsRepositoryInterface')
    private tweetsRepository: TweetsRepositoryInterface
    ) {}

  public async execute({ authorId, content, timestamp, referredTweetId }: CreateATweetProps): Promise<Tweet> {
    let referredTweet: Tweet
    if(referredTweetId) {
      referredTweet = await this.tweetsRepository.findById(referredTweetId)
      if(!referredTweet) throw new InvalidReferredTweetError()
    }

    const newTweet = Tweet.create({
      authorId: new UserId(authorId),
      content,
      createdAt: timestamp,
      referredTweet
    })

    await this.tweetsRepository.create(newTweet)

    return newTweet
  }
}

export { CreateATweet }
