import { Request, Response } from 'express'
import moment from 'moment'
import { repositories } from '../repositories'
import { TransactionTypes } from '../types/enums'
import { ITransactionController } from './interfaces'

class TransactionController implements ITransactionController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { typeId, description, value, date } = req.body

      if (!typeId || !description || !value || !date) {
        return res
          .status(400)
          .json({ error: { message: 'Missing required fields' } })
      }

      if (
        ![TransactionTypes.Revenue, TransactionTypes.Expense].includes(
          Number(typeId)
        )
      ) {
        return res.status(400).json({ error: { message: 'Invalid type' } })
      }

      if (date && !moment(date, moment.ISO_8601).isValid()) {
        return res.status(400).json({ error: { message: 'Invalid date' } })
      }

      const { userId } = req

      await repositories.transaction.create({
        date: moment(date).toDate(),
        value,
        description,
        typeId: Number(typeId),
        userId: userId as number,
      })

      return res
        .status(201)
        .json({ message: 'Transaction created successfully' })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: 'Internal server error',
      })
    }
  }

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req
      const transactions = await repositories.transaction.findAll(
        userId as number
      )

      return res.status(200).json(transactions)
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: 'Internal server error',
      })
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const transactionId = Number(req.params.id)

      if (isNaN(transactionId) || transactionId <= 0) {
        return res
          .status(400)
          .json({ error: { message: 'Invalid transaction id' } })
      }

      const { userId } = req

      const transaction = await repositories.transaction.findById(
        transactionId,
        userId as number
      )

      if (!transaction) {
        return res
          .status(404)
          .json({ error: { message: 'Transaction not found' } })
      }

      return res.status(200).json(transaction)
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: 'Internal server error',
      })
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { body, userId } = req
      if (!body) {
        return res.status(400).json({ error: { message: 'Body is required' } })
      }

      const transactionId = Number(req.params.id)

      if (isNaN(transactionId) || transactionId <= 0) {
        return res
          .status(400)
          .json({ error: { message: 'Invalid transaction id' } })
      }

      if (body.date && !moment(body.date, moment.ISO_8601).isValid()) {
        return res.status(400).json({ error: { message: 'Invalid date' } })
      }

      const transaction = await repositories.transaction.findById(
        transactionId,
        userId as number
      )

      if (!transaction) {
        return res
          .status(404)
          .json({ error: { message: 'Transaction not found' } })
      }

      const transactionUpdated = await repositories.transaction.updateById(
        transactionId,
        {
          value: body.value,
          date: body.date && moment(body.date).toDate(),
          description: body.description,
          typeId: body.typeId,
        }
      )

      return res.status(200).json(transactionUpdated)
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: 'Internal server error',
      })
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const transactionId = Number(req.params.id)

      if (isNaN(transactionId) || transactionId <= 0) {
        return res
          .status(400)
          .json({ error: { message: 'Invalid transaction id' } })
      }

      const { userId } = req

      const transaction = await repositories.transaction.findById(
        transactionId,
        userId as number
      )

      if (!transaction) {
        return res
          .status(404)
          .json({ error: { message: 'Transaction not found' } })
      }

      await repositories.transaction.delete(transactionId)

      return res
        .status(200)
        .json({ message: 'Transaction deleted successfully' })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: 'Internal server error',
      })
    }
  }
}

export { TransactionController }
