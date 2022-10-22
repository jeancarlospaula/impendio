import { Router } from 'express'
import { accountController } from '../controllers'
import { validateToken } from '../middlewares/validateToken'

const accountRoutes = Router()

accountRoutes.post('/login', accountController.login)
accountRoutes.post('/logout', validateToken, accountController.logout)

export { accountRoutes }
