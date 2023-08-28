import { z } from 'zod'
import { router, publicProcedure } from '../../trpc'
import { TweetsController } from '../controllers/tweets-controller'
import { LikesController } from '../controllers/likes-controller'

const tweetsController = new TweetsController()
const likesController = new LikesController()

export const tweetsRouter = router({
  create: publicProcedure
    .input(
      z.object({
        authorId: z.string(),
        content: z.string(),
        referredTweetId: z.string().optional(),
        timestamp: z.string(),
      }),
    )
    .mutation(async opts => {
      const { input } = opts
      const result = await tweetsController.create(input as Required<typeof input>)
      return result
    }),
  getUsersFeed: publicProcedure
    .input(
      z.object({
        followerId: z.string(),
      }),
    )
    .query(async opts => {
      const { input } = opts
      const result = await tweetsController.index(input as Required<typeof input>)
      return result
    }),
  likeATweet: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        tweetId: z.string(),
        timestamp: z.string(),
      }),
    )
    .mutation(async opts => {
        const { input } = opts
        const result = await likesController.create(input as Required<typeof input>)
        return result
    }),
})
