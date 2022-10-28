import { IUserRepository } from './IUserRepository'
import { IBlacklistRepository } from './IBlacklistRepository'
import { ITransactionRepository } from './ITransactionRepository'

interface IRepositories {
  user: IUserRepository
  blacklist: IBlacklistRepository
  transaction: ITransactionRepository
}

export {
  IRepositories,
  IUserRepository,
  ITransactionRepository,
  IBlacklistRepository,
}
