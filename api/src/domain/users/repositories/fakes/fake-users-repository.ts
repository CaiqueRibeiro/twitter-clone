import { UserId } from '@domain/users/value-objects/user-id'
import { UsersRepositoryInterface } from '../users-repository.usecase'
import { User } from '@domain/users/entities/user'

class FakeUsersRepository implements UsersRepositoryInterface {
  public users: User[]

  constructor() {
    this.users = []
  }

  async create(input: User): Promise<void> {
    this.users.push(input)
  }

  async findById(userId: string | UserId): Promise<User | null> {
    let id: UserId
    if (!(userId instanceof UserId)) {
      id = new UserId(userId)
    }
    const user = this.users.find(user => user.id.equals(id))
    if (!user) return null
    return user
  }
}

export { FakeUsersRepository }
