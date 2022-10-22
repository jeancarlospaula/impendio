import { Request, Response, NextFunction } from 'express'

const handlerRequestError = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof Error) {
    console.log(error)
    return res.status(400).json({ error: { message: error.message } })
  }
  next()
}

export { handlerRequestError }
