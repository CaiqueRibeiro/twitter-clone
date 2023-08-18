import "reflect-metadata"
import dotenv from 'dotenv'
import express from 'express'
import '@infra/container'
import * as trpcExpress from '@trpc/server/adapters/express'
import { expressHandler } from 'trpc-playground/handlers/express'
import cors from 'cors'
import { createContext } from './trpc/trpc'
import { appRouter } from './trpc/routes'

const runApp = async () => {

  dotenv.config()

  const app = express()

  const apiEndpoint = '/trpc'
  const playgroundEndpoint = '/playground'

  app.use(cors())
  app.disable('x-powered-by')
  app.use(express.json())

  app.use(apiEndpoint, trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
  }))

  app.use(
    playgroundEndpoint,
    await expressHandler({
      trpcApiEndpoint: apiEndpoint,
      playgroundEndpoint,
      router: appRouter
    })
  )

  const port: number = Number(process.env.PORT) || 3333

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  })
}

runApp()
