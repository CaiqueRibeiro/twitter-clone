import { z } from 'zod'
import { router } from '../../trpc'
import { UsersController } from '../controllers/users-controller'
import { authorizedProcedure } from '../../shared/auth-middleware'
import { TRPCError } from '@trpc/server'

const usersController = new UsersController()

export const usersRouter = router({
  getUserData: authorizedProcedure
  .mutation(async ({ ctx }) => {
    const { user_id: userId } = ctx
    if(!userId) throw new TRPCError({ code: 'UNAUTHORIZED' })
    const result = await usersController.getUserData({ userId })
    return result
  }),
  follow: authorizedProcedure
    .input(
      z.object({
        userId: z.string(),
        userToFollow: z.string(),
      }),
    )
    .mutation(async opts => {
      const { input } = opts
      const result = await usersController.follow(
        input as Required<typeof input>,
      )
      return result
    }),
})
