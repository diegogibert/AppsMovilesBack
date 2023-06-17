import express from 'express'
import { addCategory, getCategory, removeCategory } from '../controllers/categoryController.js'
import { userAuth } from '../middleware/userAuth.js'

const router = express.Router()

router.post('/', userAuth, addCategory)

router.get('/', userAuth, getCategory)

router.delete('/', userAuth, removeCategory)

export { router as categoryRouter }