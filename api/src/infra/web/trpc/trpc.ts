import { initTRPC, inferAsyncReturnType } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'

export const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({})

export const t = initTRPC.context<inferAsyncReturnType<typeof createContext>>().create()
export const router = t.router
export const publicProcedure = t.procedure