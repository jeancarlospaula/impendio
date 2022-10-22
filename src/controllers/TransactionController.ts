import { Request, Response } from 'express'
import { ITransactionController } from './interfaces'

class TransactionController implements ITransactionController {
  async create(req: Request, res: Response): Promise<Response> {
    return res.status(200)
  }

  async find(req: Request, res: Response): Promise<Response> {
    return res.status(200)
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    return res.status(200)
  }

  async update(req: Request, res: Response): Promise<Response> {
    return res.status(200)
  }

  async delete(req: Request, res: Response): Promise<Response> {
    return res.status(200)
  }
}

export { TransactionController }
