import { z } from 'zod'
import { router, middleware, publicProcedure } from '../../trpc'
import { TweetsController } from '../controllers/tweets-controller'
import { LikesController } from '../controllers/likes-controller'
import { TRPCError } from '@trpc/server'
import jwt from 'jsonwebtoken'

const isLoggedMiddleware = middleware(async ({ ctx, next }) => {
  if(!ctx.token) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  try {
    const userId = jwt.verify(ctx.token, process.env.JWT_SECRET)
    return next({
      ctx: { userId }
    })
  } catch (error) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
})

const authorizedProcedure = publicProcedure.use(isLoggedMiddleware)

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
