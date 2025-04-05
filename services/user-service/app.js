import express from 'express'
import cors from 'cors'
import { authenticateToken } from './src/middleware/UserMiddleware.js'
import UserRoute from './src/route/UserRoute.js'
import dotenv from 'dotenv'

dotenv.config()
const port = process.env.PORT || 5001

const app = express()
app.use(cors({
    origin: '*',
}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(authenticateToken)

app.use('/contact', UserRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})