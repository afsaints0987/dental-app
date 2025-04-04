import express from 'express'
import { RegisterUser, LoginUser, DisplayUser } from '../controller/AuthController.js'

const router = express.Router()

router.post('/register', RegisterUser).post('/login', LoginUser)
router.get('/me', DisplayUser)

export default router