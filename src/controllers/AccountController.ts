import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { repositories } from '../repositories'
import { IAccountController } from './interfaces'

class AccountController implements IAccountController {
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const encodedAuth = req.headers.authorization?.toString().split(' ')[1]
      const decodedAuth =
        encodedAuth &&
        Buffer.from(encodedAuth, 'base64').toString('utf-8').split(':')

      const email = decodedAuth && decodedAuth[0]
      const password = decodedAuth && decodedAuth[1]

      if (!email || !password) {
        return res.status(401).json({
          error: {
            message: 'Email or password is incorrect',
          },
        })
      }

      const user = await repositories.user.findByEmail(email)

      if (!user) {
        return res.status(401).json({
          error: {
            message: 'Email or password is incorrect',
          },
        })
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password as string
      )

      if (!isPasswordCorrect) {
        return res.status(401).json({
          error: {
            message: 'Email or password is incorrect',
          },
        })
      }

      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.SECRET_JWT as string,
        {
          expiresIn: '24h',
        }
      )

      return res.status(200).json({ token })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: 'Internal server error',
      })
    }
  }

  async logout(req: Request, res: Response): Promise<Response> {
    try {
      const { token } = req
      await repositories.blacklist.create(token as string)

      return res.status(200).json({ message: 'Logged out successfully' })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: 'Internal server error',
      })
    }
  }
}

export { AccountController }
