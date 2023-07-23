import { Tweet } from "../entities/tweet"

export interface TweetsRepositoryInterface {
  create(input: Tweet): Promise<void>
  findAllByAuthorId(authorId: string): Promise<Tweet[]>
}