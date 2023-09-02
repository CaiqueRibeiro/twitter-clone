import {
  ProfilesRepositoryInterface,
  RegisterInput,
} from '../profiles-repository.interface'

interface ProfileDTO {
  email: string
  password: string
}

class FakeProfilesRepository implements ProfilesRepositoryInterface {
  public profiles: ProfileDTO[]

  constructor() {
    this.profiles = []
  }

  async register({ email, password }: RegisterInput): Promise<void> {
    this.profiles.push({
      email,
      password,
    })
  }

  async login({ email, password }: RegisterInput): Promise<boolean> {
    const isValidLogin = this.profiles.find(
      item => item.email === email && item.password === password,
    )

    if (isValidLogin) {
      return true
    }

    return false
  }
}

export { FakeProfilesRepository }
