import { Router } from 'express'
import { transactionController } from '../controllers'
import { validateToken } from '../middlewares/validateToken'

const transactionRoutes = Router()

transactionRoutes.post('/', validateToken, transactionController.create)
transactionRoutes.get('/', validateToken, transactionController.find)
transactionRoutes.get('/:id', validateToken, transactionController.findOne)
transactionRoutes.patch('/:id', validateToken, transactionController.update)
transactionRoutes.delete('/:id', validateToken, transactionController.delete)

export { transactionRoutes }
