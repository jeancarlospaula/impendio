import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

const connectDB = async () => {
  await prismaClient
    .$connect()
    .then(() => {
      console.log('Connected to database')
    })
    .catch((err) => {
      console.log('Error connecting to database')
      throw err
    })
}

const disconnectDB = async () => {
  await prismaClient
    .$disconnect()
    .then(() => {
      console.log('Disconnected from database')
    })
    .catch((err) => {
      console.log('Error disconnecting from database')
      throw err
    })
}

export { prismaClient, connectDB, disconnectDB }
