import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { repositories } from '../repositories'
import { IUserController } from './interfaces'

class UserController implements IUserController {
  async register(req: Request, res: Response): Promise<Response> {
    try {
      const encodedAuth = req.headers.authorization?.toString().split(' ')[1]

      const decodedAuth =
        encodedAuth &&
        Buffer.from(encodedAuth, 'base64').toString('utf-8').split(':')

      const email = decodedAuth && decodedAuth[0]
      const password = decodedAuth && decodedAuth[1]
      const { firstName, lastName } = req.body

      if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({
          error: {
            message: 'Missing required fields',
          },
        })
      }

      const userAlreadyExists = await repositories.user.findByEmail(email)

      if (userAlreadyExists) {
        return res.status(400).json({
          error: {
            message: 'User already exists with provided email',
          },
        })
      }

      const encryptedPassword = await bcrypt.hash(
        password,
        await bcrypt.genSalt(12)
      )

      await repositories.user.create({
        firstName,
        lastName,
        email,
        password: encryptedPassword,
      })

      return res.status(201).json({
        message: 'User registered successfully',
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
      const { body, userId } = req

      const encodedPassword = req.headers.authorization?.toString()

      const password =
        encodedPassword &&
        Buffer.from(encodedPassword, 'base64').toString('utf-8')

      const encryptedPassword =
        password && (await bcrypt.hash(password, await bcrypt.genSalt(12)))

      await repositories.user.updateById(userId as number, {
        firstName: body?.firstName,
        lastName: body?.lastName,
        password: encryptedPassword,
      })

      return res.status(201).json({
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

      const user = await repositories.user.findById(userId as number)

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
