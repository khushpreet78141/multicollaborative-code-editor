import express from 'express'
import registerController from '../controllers/registerController.js'
import loginController from '../controllers/loginController.js'
const router = express.Router()

//register a user
router.post("/register",registerController)

//for login a user
router.post("/login",loginController)

export default router;