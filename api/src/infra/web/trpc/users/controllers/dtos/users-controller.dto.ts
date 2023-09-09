export interface GetUserDataRequest {
  userId: string
}

export type GetUserDataResponse = {
  id: string
  email: string
  username: string
  profileImage: string
  createdAt: string
  updatedAt: string
} | { message: string }


export interface FollowRequest {
  userId: string
  userToFollow: string
}

export type FollowResponse = void | { message: string }
