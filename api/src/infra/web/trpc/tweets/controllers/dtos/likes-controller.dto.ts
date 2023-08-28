export interface LikeATweetRequest {
  userId: string
  tweetId: string
  timestamp: string
}

export interface LikeATweetResponse {
  message: string
}
