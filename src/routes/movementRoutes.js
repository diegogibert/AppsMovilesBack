import express from 'express'
import { addMovement, getMovements, removeMovement, getMonthlyMovement } from '../controllers/movementController.js'
import { userAuth } from '../middleware/userAuth.js'

const router = express.Router()

router.post('/', userAuth, addMovement)

router.get('/', userAuth, getMovements)

router.delete('/', userAuth, removeMovement)

router.get('/month', userAuth, getMonthlyMovement)

export { router as movementRouter }
