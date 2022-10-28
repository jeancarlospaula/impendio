import { Request, Response } from 'express'

export interface IUserController {
  register: (req: Request, res: Response) => Promise<Response>
  update: (req: Request, res: Response) => Promise<Response>
  find: (req: Request, res: Response) => Promise<Response>
}
