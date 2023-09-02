import { Router } from 'express'
import { usersRouter } from '@infra/web/rest/users/routes/users.routes'
import { AuthMiddleware } from './shared/middlewares/auth-middleware'

const mainRestRouter = Router()

mainRestRouter.use(AuthMiddleware())

mainRestRouter.use('/users', usersRouter)

export { mainRestRouter }
