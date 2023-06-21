import express from 'express'
import { singUp, signIn, userSummary, monthlyUserSummary } from '../controllers/userController.js'
import { userAuth } from '../middleware/userAuth.js'

const router = express.Router()

router.post('/sign-in', signIn)
router.post('/sign-up', singUp)
router.get('/status', userAuth, userSummary)
router.get('/status/month', userAuth, monthlyUserSummary)

export { router as userRouter }
