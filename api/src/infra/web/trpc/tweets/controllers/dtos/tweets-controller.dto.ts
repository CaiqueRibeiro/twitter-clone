export interface CreateTweetRequest {
  authorId: string;
  content: string;
  timestamp: string;
}

export type CreateTweetResponse = void