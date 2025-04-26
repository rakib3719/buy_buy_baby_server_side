import express, { Application } from 'express'
import cors from 'cors'
import userRoute from './routes/userRoute'
import connectDB from './configure/db'
import dotenv from 'dotenv'
import otpRoute from './routes/otpRoute'
import doctorRoute from './routes/doctorRouter'

import productsRoute from './routes/productsRouter'
import productsReview from './routes/productsReviewRoutes'
import cart from './routes/cartRouter'
import order from './routes/orderRouter'

const app:Application = express()

dotenv.config();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/doctor', doctorRoute)
app.use('/user', userRoute)
app.use('/otp', otpRoute)
app.use('/products', productsRoute)
app.use('/products-review', productsReview)
app.use('/cart', cart)
app.use('/order', order)
connectDB()

export default app;