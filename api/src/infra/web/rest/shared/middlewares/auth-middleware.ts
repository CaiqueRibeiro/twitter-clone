import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const AuthMiddleware = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { authorization } = request.headers

    if (!authorization) {
      return response.status(401).json({ message: 'Unauthorized' })
    }

    try {
      const token = authorization.replace('Bearer ', '')
      const { sub } = jwt.verify(token, process.env.JWT_SECRET as string)

      request.headers.user_id = sub as string

      response.set('authorization', token)
      next()
    } catch {
      throw new Error('Unauthorized')
    }
  }
}

export { AuthMiddleware }
