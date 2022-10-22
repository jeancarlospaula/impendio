import { Request, Response } from 'express'

export interface IAccountController {
  login: (req: Request, res: Response) => Promise<Response>
  logout: (req: Request, res: Response) => Promise<Response>
}
