import { Tweet } from "../entities/tweet"

export interface TweetsRepositoryInterface {
  create(input: Tweet): Promise<void>
  findAllByAuthorId({ authorId, page = 1, limit = 50, orderBy = 'name', order = 'asc' }: { authorId: string, limit?: number, page?: number, orderBy?: string, order?: string }): Promise<Tweet[]>
}
