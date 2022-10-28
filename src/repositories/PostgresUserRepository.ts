import { Prisma } from '@prisma/client'
import { UserModel } from '../models'
import { User } from '../models/schemas'
import { IUserRepository } from './interfaces'

class PostgresUserRepository implements IUserRepository {
  async create({
    firstName,
    lastName,
    email,
    password,
  }: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<Pick<User, 'id'>> {
    return await UserModel.create({
      data: {
        firstName,
        lastName,
        email,
        password,
      },
      select: {
        id: true,
      },
    })
  }

  async findByEmail(
    email: string
  ): Promise<Pick<User, 'id' | 'email' | 'password'> | null> {
    return await UserModel.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
      },
    })
  }

  async findById(
    id: number
  ): Promise<Pick<User, 'firstName' | 'lastName' | 'email'> | null> {
    return await UserModel.findUnique({
      where: {
        id,
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
      },
    })
  }

  async updateById(
    id: number,
    {
      firstName,
      lastName,
      password,
    }: Partial<Pick<User, 'firstName' | 'lastName' | 'password'>>
  ): Promise<Pick<User, 'firstName' | 'lastName' | 'email'> | null> {
    return await UserModel.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        password,
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
      },
    })
  }
}

export { PostgresUserRepository }
