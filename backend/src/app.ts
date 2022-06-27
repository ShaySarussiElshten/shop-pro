import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './config/db'
import cors from 'cors'

const corsOptions = {
  exposedHeaders: 'X-Total-Count',
};


dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(cors(corsOptions));


const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  }
)
