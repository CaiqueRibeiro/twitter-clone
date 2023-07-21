import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { TweetsController } from '../controllers/tweets-controller'

const tweetsController = new TweetsController()

export const tweetsRouter = router({
  create: publicProcedure
  .input(z.object({
    authorId: z.string(),
    content: z.string(),
    timestamp: z.string(),
  }))
  .mutation(async (opts) => {
    try {
      const { input }= opts
      await tweetsController.create(input as Required<typeof input>)
      return { message: 'Tweet created.' }
    } catch (error) {
      return { message: 'Error while trying to create tweet.'}
    }
  })
})