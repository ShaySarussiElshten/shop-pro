import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './config/db'
import cors from 'cors'
import userRoutes from './routes/userRoutes'
import productRoutes from './routes/productRoutes'



dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())


app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)


const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  }
)
