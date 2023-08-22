import { router } from './trpc'
import { tweetsRouter } from './tweets/routes/tweets.router'

export const appRouter = router({
  tweet: tweetsRouter,
})

export type AppRouter = typeof appRouter
