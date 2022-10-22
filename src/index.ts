import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { routes } from './routes'
import { connectDB, disconnectDB } from './database/connectDB'

const app = express()
const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB()

    app.use('/', routes)
    app.use((req, res) => {
      res.status(404).json({ message: 'Route not found' })
    })

    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  } catch (err) {
    console.log(`Error running server ${err}`)
    await disconnectDB()
  }
}

start()
