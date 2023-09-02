import { z } from 'zod'
import { router } from '../../trpc'
import { UsersController } from '../controllers/users-controller'
import { authorizedProcedure } from '../../shared/auth-middleware'

const usersController = new UsersController()

export const usersRouter = router({
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
