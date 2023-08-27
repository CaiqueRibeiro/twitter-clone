import { RegisterInput } from '@domain/users/repositories/profiles-repository.interface'

class ProfileMapper {
  public static toPrisma(profile: RegisterInput) {
    const map = {
      email: profile.email,
      password: profile.password,
    }

    return map
  }
}

export { ProfileMapper }
