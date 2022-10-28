import { Prisma } from '@prisma/client'
import { TransactionModel } from '../models'
import { Transaction } from '../models/schemas'
import { ITransactionRepository } from './interfaces'

class PostgresTransactionRepository implements ITransactionRepository {
  async create({
    date,
    description,
    value,
    typeId,
    userId,
  }: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<
    Pick<Transaction, 'id'>
  > {
    return await TransactionModel.create({
      data: {
        date,
        value,
        description,
        typeId,
        userId,
      },
      select: {
        id: true,
      },
    })
  }

  async findAll(
    userId: number
  ): Promise<Omit<Transaction, 'userId' | 'createdAt' | 'updatedAt'>[]> {
    return await TransactionModel.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        value: true,
        date: true,
        description: true,
        typeId: true,
      },
      orderBy: {
        id: 'desc',
      },
    })
  }

  async findById(
    id: number,
    userId: number
  ): Promise<Omit<Transaction, 'userId' | 'createdAt' | 'updatedAt'> | null> {
    return await TransactionModel.findFirst({
      where: {
        id,
        userId,
      },
      select: {
        id: true,
        value: true,
        date: true,
        description: true,
        typeId: true,
      },
    })
  }

  async updateById(
    id: number,
    {
      date,
      value,
      typeId,
      description,
    }: Partial<Pick<Transaction, 'value' | 'description' | 'date' | 'typeId'>>
  ): Promise<Omit<Transaction, 'userId' | 'createdAt' | 'updatedAt'> | null> {
    return await TransactionModel.update({
      where: {
        id,
      },
      data: {
        value,
        date,
        description,
        typeId,
      },
      select: {
        id: true,
        value: true,
        date: true,
        description: true,
        typeId: true,
      },
    })
  }

  async delete(id: number): Promise<void> {
    await TransactionModel.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    })
    return
  }
}

export { PostgresTransactionRepository }
