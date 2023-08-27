import { User } from '../entities/user'
import { UserId } from '../value-objects/user-id'

export interface UsersRepositoryInterface {
  create(user: User): Promise<void>
  findById(tweetId: UserId | string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findByUsername(username: string): Promise<User | null>
}
