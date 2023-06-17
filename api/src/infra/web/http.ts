import dotenv from 'dotenv'
import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import { createContext } from './trpc/context'

dotenv.config()

const app: Express = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(cors())
app.disable('x-powered-by')
app.use(express.json())
app.use('/example', (request, response) => {
  return response.json({ message: 'Twitter Clone' })
})

// Error middleware (must be the last one)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err)
  }
  const message = err.message || 'Algo deu errado, tente novamente mais tarde'
  if (process.env.NODE_ENV === 'production') {
    res.status(500).json({ error: message })
  } else {
    const stack = err.stack || ''
    res.status(500).json({ error: `${message}\n${stack}` })
  }
  console.error(err)
})

app.use(createContext) //tRPC instantiation

export { server, io }
