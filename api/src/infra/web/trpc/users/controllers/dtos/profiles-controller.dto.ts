export interface RegisterRequest {
  username: string
  email: string
  password: string
  profileImage: string
}

export interface RegisterResponse {
  message: string
}
