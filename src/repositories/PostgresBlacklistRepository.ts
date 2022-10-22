import { Prisma } from '@prisma/client'
import { BlacklistModel } from '../models'
import { Blacklist } from '../models/schemas'
import { IBlacklistRepository } from './interfaces/IBlacklistRepository'

class PostgresBlacklistRepository implements IBlacklistRepository {
  async create(data: Prisma.BlacklistCreateArgs): Promise<Blacklist> {
    return await BlacklistModel.create(data)
  }

  async findOne(
    data: Prisma.BlacklistFindFirstArgs
  ): Promise<Blacklist | null> {
    return await BlacklistModel.findFirst(data)
  }
}

export { PostgresBlacklistRepository }
