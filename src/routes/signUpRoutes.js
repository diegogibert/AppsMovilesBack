import express from 'express'
import { singUp } from '../controllers/signUpController.js'

const router = express.Router()

router.post('/', singUp)

export { router as signUpRouter }
