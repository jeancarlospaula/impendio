import { Prisma } from '@prisma/client'
import { Blacklist } from '../../models/schemas'

export interface IBlacklistRepository {
  create(data: Prisma.BlacklistCreateArgs): Promise<Blacklist>
  findOne: (data: Prisma.BlacklistFindFirstArgs) => Promise<Blacklist | null>
}
