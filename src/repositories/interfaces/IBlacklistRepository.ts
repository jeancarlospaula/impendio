import { Prisma } from '@prisma/client'
import { Blacklist } from '../../models/schemas'

export interface IBlacklistRepository {
  create(token: string): Promise<Pick<Blacklist, 'id'>>
  findByToken: (token: string) => Promise<Pick<Blacklist, 'id'> | null>
}
