import { initTRPC, inferAsyncReturnType, TRPCError } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'

export const getAccessToken = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  try {
    let access_token: string

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      access_token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies?.access_token) {
      access_token = req.cookies.access_token
    }

    const notAuthenticated = {
      req,
      res,
      token: null as string,
    }

    if (!access_token) {
      return notAuthenticated
    }

    return {
      req,
      res,
      token: access_token,
    }
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    })
  }
}

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => getAccessToken({ req, res })

export const t = initTRPC
  .context<inferAsyncReturnType<typeof createContext>>()
  .create()
export const router = t.router
export const middleware = t.middleware
export const publicProcedure = t.procedure
