import { z } from 'zod'
import { router } from '../../trpc'
import { TweetsController } from '../controllers/tweets-controller'
import { LikesController } from '../controllers/likes-controller'
import { authorizedProcedure } from '../../shared/auth-middleware'
import { TRPCError } from '@trpc/server'

const tweetsController = new TweetsController()
const likesController = new LikesController()

export const tweetsRouter = router({
  create: authorizedProcedure
    .input(
      z.object({
        content: z.string(),
        referredTweetId: z.string().optional(),
        timestamp: z.string(),
      }),
    )
    .mutation(async opts => {
      const { input, ctx } = opts
      const { user_id } = ctx
      if(!user_id) throw new TRPCError({ code: 'UNAUTHORIZED' })
      const result = await tweetsController.create({ ...input, authorId: user_id })
      return result
    }),
  getUsersFeed: authorizedProcedure
    .query(async opts => {
      const { ctx } = opts
      const { user_id } = ctx
      if(!user_id) throw new TRPCError({ code: 'UNAUTHORIZED' })
      const result = await tweetsController.index({ followerId: user_id })
      return result
    }),
  likeATweet: authorizedProcedure
    .input(
      z.object({
        tweetId: z.string(),
        timestamp: z.string(),
      }),
    )
    .mutation(async opts => {
      const { input, ctx } = opts
      const { user_id } = ctx
      if(!user_id) throw new TRPCError({ code: 'UNAUTHORIZED' })
      const result = await likesController.create({ ...input, userId: user_id})
      return result
    }),
})
