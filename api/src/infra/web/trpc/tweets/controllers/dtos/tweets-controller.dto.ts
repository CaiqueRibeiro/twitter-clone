export interface CreateTweetRequest {
  authorId: string;
  content: string;
  timestamp: string;
  referredTweetId?: string;
}

export type CreateTweetResponse = void
