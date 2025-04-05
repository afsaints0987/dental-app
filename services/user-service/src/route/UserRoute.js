import express from 'express'
import { DisplayUser } from '../controller/UserController.js'

const router = express.Router()

router.get("/me", DisplayUser)

export default router