import { router } from './trpc'
import { tweetsRouter } from './tweets/routes/tweets.router'
import { profilesRouter } from './users/routes/profiles.router'

export const appRouter = router({
  tweet: tweetsRouter,
  profile: profilesRouter
})

export type AppRouter = typeof appRouter
