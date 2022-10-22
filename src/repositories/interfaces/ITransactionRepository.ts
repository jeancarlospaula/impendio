import { Prisma } from '@prisma/client'
import { Transaction } from '../../models/schemas'

export interface ITransactionRepository {
  create: (data: Prisma.TransactionCreateArgs) => Promise<Transaction>
  delete: (data: Prisma.TransactionDeleteArgs) => Promise<void>
  update: (data: Prisma.TransactionUpdateArgs) => Promise<Transaction | null>
  find: (data: Prisma.TransactionFindManyArgs) => Promise<Transaction[]>
  findOne: (
    data: Prisma.TransactionFindFirstArgs
  ) => Promise<Transaction | null>
}
