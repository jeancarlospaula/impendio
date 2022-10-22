import { UserController } from './UserController'
import { AccountController } from './AccountController'
import { TransactionController } from './TransactionController'

const userController = new UserController()
const accountController = new AccountController()
const transactionController = new TransactionController()

export { userController, accountController, transactionController }
