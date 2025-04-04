import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoute from './route/AuthRoute.js'
import { authenticateToken } from './middleware/AuthMiddleware.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 5000
app.use(cors({
    origin: '*'
}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/auth', authRoute)
app.use('/contact', authenticateToken, authRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

