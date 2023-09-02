import { Router } from 'express'
import { usersRouter } from '@infra/web/rest/users/routes/users.routes'

const mainRestRouter = Router()

mainRestRouter.use('/users', usersRouter)

export { mainRestRouter }
