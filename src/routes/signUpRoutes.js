import express from 'express'
import { singUpController } from '../controllers/signUpController.js'

const router = express.Router()

router.post('/', singUpController)

export { router as signUpRouter }
