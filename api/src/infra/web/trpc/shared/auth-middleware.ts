import { TRPCError } from '@trpc/server'
import { middleware, publicProcedure } from '../trpc'
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

export { authorizedProcedure }