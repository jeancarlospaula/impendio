import { Request, Response } from 'express'

export interface ITransactionController {
  create: (req: Request, res: Response) => Promise<Response>
  find: (req: Request, res: Response) => Promise<Response>
  findOne: (req: Request, res: Response) => Promise<Response>
  update: (req: Request, res: Response) => Promise<Response>
  delete: (req: Request, res: Response) => Promise<Response>
}
