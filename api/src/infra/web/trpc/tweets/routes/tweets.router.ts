import { z } from 'zod'
import { router } from '../../trpc'
import { TweetsController } from '../controllers/tweets-controller'
import { LikesController } from '../controllers/likes-controller'
import { authorizedProcedure } from '../../shared/auth-middleware'


const tweetsController = new TweetsController()
const likesController = new LikesController()

export const tweetsRouter = router({
  create: authorizedProcedure
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
  getUsersFeed: authorizedProcedure
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
  likeATweet: authorizedProcedure
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
