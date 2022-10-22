import { Prisma } from '@prisma/client'
import { TransactionModel } from '../models'
import { Transaction } from '../models/schemas'
import { ITransactionRepository } from './interfaces'

class PostgresTransactionRepository implements ITransactionRepository {
  async create(data: Prisma.TransactionCreateArgs): Promise<Transaction> {
    return await TransactionModel.create(data)
  }

  async find(data: Prisma.TransactionFindManyArgs): Promise<Transaction[]> {
    return await TransactionModel.findMany(data)
  }

  async findOne(
    data: Prisma.TransactionFindFirstArgs
  ): Promise<Transaction | null> {
    return await TransactionModel.findFirst(data)
  }

  async update(
    data: Prisma.TransactionUpdateArgs
  ): Promise<Transaction | null> {
    return await TransactionModel.update(data)
  }

  async delete(data: Prisma.TransactionDeleteArgs): Promise<void> {
    await TransactionModel.delete(data)
    return
  }
}

export { PostgresTransactionRepository }
