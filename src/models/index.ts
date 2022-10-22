import { prismaClient } from '../database/connectDB'

const UserModel = prismaClient.user
const BlacklistModel = prismaClient.blacklist
const TransactionModel = prismaClient.transaction

export { UserModel, TransactionModel, BlacklistModel }
