import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoute from './src/route/AuthRoute.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 5000
app.use(cors({
    origin: '*'
}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/auth', authRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

