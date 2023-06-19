import express from 'express'
import { addMovement, getMovements, removeMovement } from '../controllers/movementController.js'
import { userAuth } from '../middleware/userAuth.js'

const router = express.Router()

router.post('/', userAuth, addMovement)

router.get('/', userAuth, getMovements)

router.delete('/', userAuth, removeMovement)

export { router as movementRouter }
