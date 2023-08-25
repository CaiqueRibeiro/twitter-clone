import { User } from '../entities/user'
import { UserId } from '../value-objects/user-id'

export interface UsersRepositoryInterface {
  findById(tweetId: UserId | string): Promise<User | null>
}
