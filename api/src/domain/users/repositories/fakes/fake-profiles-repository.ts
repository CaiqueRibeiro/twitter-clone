import {
  ProfilesRepositoryInterface,
  RegisterInput,
} from '../profiles-repository.interface'

interface ProfileDTO {
  username: string
  email: string
  password: string
  profileImage: string
}

class FakeProfilesRepository implements ProfilesRepositoryInterface {
  public profiles: ProfileDTO[]

  constructor() {
    this.profiles = []
  }

  async register({
    username,
    email,
    password,
    profileImage,
  }: RegisterInput): Promise<void> {
    this.profiles.push({
      username,
      email,
      password,
      profileImage,
    })
  }
}

export { FakeProfilesRepository }
