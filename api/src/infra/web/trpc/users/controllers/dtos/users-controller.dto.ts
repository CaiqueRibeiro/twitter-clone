export interface FollowRequest {
  userId: string
  userToFollow: string
}

export type FollowResponse = { token: string } | { message: string }
