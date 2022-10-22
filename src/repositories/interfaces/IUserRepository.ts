import { Prisma } from '@prisma/client'
import { User } from '../../models/schemas'

export interface IUserRepository {
  create: (data: Prisma.UserCreateArgs) => Promise<User>
  updateOne: (data: Prisma.UserUpdateArgs) => Promise<User | null>
  findOne: (data: Prisma.UserFindUniqueArgs) => Promise<Partial<User> | null>
}
