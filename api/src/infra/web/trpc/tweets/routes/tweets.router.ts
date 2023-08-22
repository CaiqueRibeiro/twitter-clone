import { z } from 'zod'
import { router, publicProcedure } from '../../trpc'
import { TweetsController } from '../controllers/tweets-controller'

const tweetsController = new TweetsController()

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
      try {
        const { input } = opts
        await tweetsController.create(input as Required<typeof input>)
        return { message: 'Tweet created.' }
      } catch (error) {
        return { message: 'Error while trying to create tweet.' }
      }
    }),
  getUsersFeed: publicProcedure
    .input(
      z.object({
        followerId: z.string(),
      }),
    )
    .query(async opts => {
      try {
        const { input } = opts
        const allTweets = await tweetsController.index(
          input as Required<typeof input>,
        )
        return allTweets
      } catch (error) {
        return { message: 'Error while trying to list your tweets' }
      }
    }),
})
