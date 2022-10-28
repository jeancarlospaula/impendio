import { Prisma } from '@prisma/client'
import { BlacklistModel } from '../models'
import { Blacklist } from '../models/schemas'
import { IBlacklistRepository } from './interfaces/IBlacklistRepository'

class PostgresBlacklistRepository implements IBlacklistRepository {
  async create(token: string): Promise<Pick<Blacklist, 'id'>> {
    return await BlacklistModel.create({
      data: {
        token,
      },
      select: {
        id: true,
      },
    })
  }

  async findByToken(token: string): Promise<Pick<Blacklist, 'id'> | null> {
    return await BlacklistModel.findFirst({
      where: {
        token,
      },
      select: {
        id: true,
      },
    })
  }
}

export { PostgresBlacklistRepository }
