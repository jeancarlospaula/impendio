import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { repositories } from '../repositories'

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers['x-access-token']

    if (!token) {
      return res.status(401).json({
        error: {
          message: 'Valid x-access-token header is required',
        },
      })
    }

    const isTokenBlacklisted = await repositories.blacklist.findByToken(
      token as string
    )

    if (isTokenBlacklisted) {
      return res.status(401).json({
        error: {
          message: 'Expired token',
        },
      })
    }

    const { userId } = jwt.verify(
      token as string,
      process.env.SECRET_JWT as string
    ) as JwtPayload

    req.userId = userId
    req.token = token as string

    next()
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'invalid token') {
        return res.status(401).json({
          error: {
            message: 'Valid x-access-token header is required',
          },
        })
      }

      if (error.message === 'jwt expired') {
        return res.status(401).json({
          error: {
            message: 'Expired token',
          },
        })
      }

      console.log(error)

      return res.status(500).json({
        error: {
          message: 'Internal server error',
        },
      })
    }

    console.log(error)

    return res.status(500).json({
      error: {
        message: 'Internal server error',
      },
    })
  }
}

export { validateToken }
