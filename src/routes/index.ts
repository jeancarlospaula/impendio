import express, { Router } from 'express'
import cors from 'cors'
import { userRoutes } from './userRoutes'
import { accountRoutes } from './accountRoutes'
import { transactionRoutes } from './transactionRoutes'
import { handlerRequestError } from '../middlewares/handlerRequestError'

const routes = Router()

routes.use(
  express.json(),
  handlerRequestError,
  cors({
    origin: '*',
  })
)

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'API active' })
})

routes.use('/', accountRoutes)
routes.use('/user', userRoutes)
routes.use('/transaction', transactionRoutes)

export { routes }
