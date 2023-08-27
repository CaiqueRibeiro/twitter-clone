export interface RegisterInput {
  username: string
  email: string
  password: string
  profileImage?: string
}

export interface ProfilesRepositoryInterface {
  register(input: RegisterInput): Promise<void>
}
