import { Router } from 'express'
import { userController } from '../controllers'
import { validateToken } from '../middlewares/validateToken'

const userRoutes = Router()

userRoutes.post('/', userController.register)
userRoutes.get('/', validateToken, userController.find)
userRoutes.patch('/', validateToken, userController.update)

export { userRoutes }
