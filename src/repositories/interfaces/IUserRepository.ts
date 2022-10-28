import { Prisma } from '@prisma/client'
import { User } from '../../models/schemas'

export interface IUserRepository {
  create: (
    user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<Pick<User, 'id'>>
  findByEmail: (
    email: string
  ) => Promise<Pick<User, 'id' | 'email' | 'password'> | null>
  findById: (
    id: number
  ) => Promise<Pick<User, 'firstName' | 'lastName' | 'email'> | null>
  updateById: (
    id: number,
    data: Partial<Pick<User, 'firstName' | 'lastName' | 'password'>>
  ) => Promise<Pick<User, 'firstName' | 'lastName' | 'email'> | null>
}
