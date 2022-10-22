import { Prisma } from '@prisma/client'
import { UserModel } from '../models'
import { User } from '../models/schemas'
import { IUserRepository } from './interfaces'

class PostgresUserRepository implements IUserRepository {
  async create(data: Prisma.UserCreateArgs): Promise<User> {
    const newUser = await UserModel.create(data)
    return newUser
  }

  async findOne(
    data: Prisma.UserFindUniqueArgs
  ): Promise<Partial<User> | null> {
    return await UserModel.findUnique(data)
  }

  async updateOne(data: Prisma.UserUpdateArgs): Promise<User | null> {
    return await UserModel.update(data)
  }
}

export { PostgresUserRepository }
