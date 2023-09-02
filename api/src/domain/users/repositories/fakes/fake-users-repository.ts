import { UserId } from '@domain/users/value-objects/user-id'
import { UsersRepositoryInterface } from '../users-repository.interface'
import { User } from '@domain/users/entities/user'

interface Follower {
  follower_id: string
  followee_id: string
}

class FakeUsersRepository implements UsersRepositoryInterface {
  public users: User[]
  public followers: Follower[]

  constructor() {
    this.users = []
    this.followers = []
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

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email)
    if (!user) return null
    return user
  }

  async findByUsername(username: string): Promise<User> {
    const user = this.users.find(user => user.username === username)
    if (!user) return null
    return user
  }

  async followUser(userId: string, userToFollow: string): Promise<void> {
    const followeee = this.users.find(user => user.id.value === userToFollow)
    if (!followeee) throw new Error('User does not exist')
    this.followers.push({
      follower_id: userId,
      followee_id: userToFollow,
    })
  }

  async getFollowers(user: User): Promise<User[]> {
    const followers = this.followers
      .filter(follower => follower.followee_id === user.id.value)
      .map(follower => follower.follower_id)
    const users = this.users.filter(user => followers.includes(user.id.value))
    return users
  }
}

export { FakeUsersRepository }
