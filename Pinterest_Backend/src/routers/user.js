import express from 'express'
import controller from '../controllers/UserController'

const router = express.Router()
router.post('/register', controller.register)

export default router