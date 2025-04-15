import express, { Application } from 'express'
import cors from 'cors'
import userRoute from './routes/userRoute'
import connectDB from './configure/db'
import dotenv from 'dotenv'
import otpRoute from './routes/otpRoute'
import doctorRoute from './routes/doctorRouter'
import imageUploadRoute from './routes/imageUploadRoute'

const app:Application = express()

dotenv.config();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/doctor', doctorRoute)
app.use('/user', userRoute)
app.use('/otp', otpRoute)
app.use('/img',imageUploadRoute)
connectDB()

export default app;