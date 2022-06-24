import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db'
import productRoutes from './routes/productRoutes'
import { notFoundRoutes, errorHandler } from './middleware/errorMiddleware'
import userRoutes from './routes/userRoutes'
import orderRoutes from './routes/orderRoutes'
import todoRoutes from './routes/todos'
import uploadImageRoutes from './routes/uploadImageRoutes'
import uploadSongsRoutes from './routes/uploadSongsRoutes'
import cors from 'cors'

const corsOptions = {
  exposedHeaders: 'X-Total-Count',
};


dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(cors(corsOptions));

app.use(express.json())

const _dir = path.resolve()

app.use('/assets', express.static(path.join(_dir, '/assets')))


app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload/images', uploadImageRoutes)
app.use('/api/upload/songs', uploadSongsRoutes);
app.use('/todos', todoRoutes);


app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

app.use(notFoundRoutes)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  }
)
