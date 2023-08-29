export interface RegisterRequest {
  username: string
  email: string
  password: string
  profileImage: string
}

export interface RegisterResponse {
  message: string
}

export interface LoginRequest {
  email: string
  password: string
}

export type LoginResponse = { token: string } | { message: string }
