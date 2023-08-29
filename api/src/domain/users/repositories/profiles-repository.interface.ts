export interface RegisterInput {
  email: string
  password: string
}

export interface ProfilesRepositoryInterface {
  register(input: RegisterInput): Promise<void>
  login(input: RegisterInput): Promise<boolean>
}
