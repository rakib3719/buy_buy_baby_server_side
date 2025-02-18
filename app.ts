import express, { Application } from 'express'
import cors from 'cors'
import userRoute from './routes/userRoute'


const app:Application = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use('/user', userRoute)

export default app;