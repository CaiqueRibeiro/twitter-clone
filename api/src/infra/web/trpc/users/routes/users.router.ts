import { z } from 'zod'
import { router } from '../../trpc'
import { UsersController } from '../controllers/users-controller'
import { authorizedProcedure } from '../../shared/auth-middleware'
import { TRPCError } from '@trpc/server'

const usersController = new UsersController()

export const usersRouter = router({
  getUserData: authorizedProcedure
  .input(z.object({ userId: z.string().optional() }))
  .mutation(async ({ input, ctx }) => {
    const { user_id: loggedUserId } = ctx
    if (!loggedUserId) throw new TRPCError({ code: 'UNAUTHORIZED' })
    const { userId } = input
    const result = await usersController.getUserData({ userId: userId ?? loggedUserId })
    return result
  }),
  follow: authorizedProcedure
    .input(z.object({ userToFollow: z.string() }))
    .mutation(async opts => {
      const { input, ctx } = opts
      const { user_id: userId } = ctx
      if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' })
      const result = await usersController.follow({ ...input, userId })
      return result
    }),
})
