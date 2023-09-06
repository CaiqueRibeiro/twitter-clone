import { router } from './trpc'
import { tweetsRouter } from './tweets/routes/tweets.router'
import { profilesRouter } from './users/routes/profiles.router'
import { usersRouter } from './users/routes/users.router'

export const appRouter = router({
  tweet: tweetsRouter,
  profile: profilesRouter,
  user: usersRouter,
})

export type AppRouter = typeof appRouter