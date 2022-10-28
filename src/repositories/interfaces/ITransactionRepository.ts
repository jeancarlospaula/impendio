import { Prisma } from '@prisma/client'
import { Transaction } from '../../models/schemas'

export interface ITransactionRepository {
  create: (
    transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<Pick<Transaction, 'id'>>
  findAll: (
    userId: number
  ) => Promise<Omit<Transaction, 'userId' | 'createdAt' | 'updatedAt'>[]>
  findById: (
    id: number,
    userId: number
  ) => Promise<Omit<Transaction, 'userId' | 'createdAt' | 'updatedAt'> | null>
  updateById: (
    id: number,
    data: Partial<
      Pick<Transaction, 'value' | 'description' | 'date' | 'typeId'>
    >
  ) => Promise<Omit<Transaction, 'userId' | 'createdAt' | 'updatedAt'> | null>
  delete: (id: number) => Promise<void>
}
