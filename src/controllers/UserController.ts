import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { repositories } from '../repositories'
import { IUserController } from './interfaces'

class UserController implements IUserController {
  async register(req: Request, res: Response): Promise<Response> {
    try {
      const { firstName, lastName, email, password } = req.body

      const userAlreadyExists = await repositories.user.findOne({
        where: { email },
        select: {
          email: true,
        },
      })

      if (userAlreadyExists) {
        return res.status(400).json({
          message: 'User already exists with provided email',
        })
      }

      const bcryptHash = await bcrypt.genSalt(12)
      const encryptedPassword = await bcrypt.hash(password, bcryptHash)

      await repositories.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: encryptedPassword,
        },
      })

      return res.status(200).json({
        message: 'User created successfully',
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: 'Internal server error',
      })
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body

      const { userId } = req

      let encryptedPassword
      if (body.password) {
        const bcryptHash = await bcrypt.genSalt(12)
        encryptedPassword = await bcrypt.hash(body.password, bcryptHash)
      }

      await repositories.user.updateOne({
        where: {
          id: userId,
        },
        data: {
          firstName: body?.firstName,
          lastName: body?.lastName,
          password: encryptedPassword,
        },
      })

      return res.status(200).json({
        message: 'User updated successfully',
      })
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

      const user = await repositories.user.findOne({
        where: { id: userId },
        select: {
          firstName: true,
          lastName: true,
          email: true,
        },
      })

      if (!user) {
        return res.status(404).json({
          error: {
            message: 'User not found',
          },
        })
      }

      return res.status(200).json(user)
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: 'Internal server error',
      })
    }
  }
}

export { UserController }
