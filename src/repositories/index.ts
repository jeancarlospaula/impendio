import { IRepositories } from './interfaces'
import { PostgresUserRepository } from './PostgresUserRepository'
import { PostgresBlacklistRepository } from './PostgresBlacklistRepository'
import { PostgresTransactionRepository } from './PostgresTransactionRepository'

const repositories: IRepositories = {
  user: new PostgresUserRepository(),
  blacklist: new PostgresBlacklistRepository(),
  transaction: new PostgresTransactionRepository(),
}

export { repositories }
