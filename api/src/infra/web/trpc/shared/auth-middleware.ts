import { TRPCError } from '@trpc/server'
import { middleware, publicProcedure } from '../trpc'
import jwt from 'jsonwebtoken'

const isLoggedMiddleware = middleware(async ({ ctx, next }) => {
  if (!ctx.token) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  try {
    const { sub } = jwt.verify(ctx.token, process.env.JWT_SECRET as string)
    return next({
      ctx: { user_id: sub as string | undefined },
    })
  } catch (error) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
})

const authorizedProcedure = publicProcedure.use(isLoggedMiddleware)

export { authorizedProcedure }
