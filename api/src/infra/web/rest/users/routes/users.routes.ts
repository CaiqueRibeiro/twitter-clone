import { Router } from 'express'
import multer from 'multer'
import { UsersRestController } from '../controllers/users-rest-controller'
import uploadConfig from '@config/upload'

const usersController = new UsersRestController()

const usersRouter = Router()
const upload = multer(uploadConfig.multer)

usersRouter.post(
  '/upload-photo',
  upload.single('photo'),
  usersController.uploadPhoto,
)

export { usersRouter }
