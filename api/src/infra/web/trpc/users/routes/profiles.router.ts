import { z } from 'zod'
import { router, publicProcedure } from '../../trpc'
import { ProfilesController } from '../controllers/profiles-controller'

const profilesController = new ProfilesController()

export const profilesRouter = router({
  create: publicProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string(),
        password: z.string(),
        profileImage: z.string().optional(),
      }),
    )
    .mutation(async opts => {
      const { input } = opts
      const result = await profilesController.register(input as Required<typeof input>)
      return result
    })
})
