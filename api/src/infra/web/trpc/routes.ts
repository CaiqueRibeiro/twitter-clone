import * as trpc from '@trpc/server'
import { z } from 'zod'

const appRouter = trpc
  .router()
  .query('getUsers', {
    input: z.string(),
    async resolve(req) {
      return { id: req.input, name: 'Zezinho' }
    },
  })
  .mutation('postTwit', {
    input: z.object({ name: z.string().min(5) }),
    async resolve(req) {
      return { id: req.input, message: 'twit created' }
    },
  })

export type AppRouter = typeof appRouter
