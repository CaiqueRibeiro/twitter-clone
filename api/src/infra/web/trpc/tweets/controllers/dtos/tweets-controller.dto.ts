export interface CreateTweetRequest {
  authorId: string
  content: string
  timestamp: string
  referredTweetId?: string
}

export interface CreateTweetResponse {
  message: string
}

export interface ListTweetsByFollowerRequest {
  followerId: string
}

export type ListTweetsByFollowerResponse =
  | {
      feed: any
    }
  | { message: string }
