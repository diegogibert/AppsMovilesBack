import express from 'express'
import { addCategory, getCategory } from '../controllers/categoryController.js'
import { userAuth } from '../middleware/userAuth.js'

const router = express.Router()

router.post('/', userAuth, addCategory)

router.get('/', userAuth, getCategory)

export { router as categoryRouter }