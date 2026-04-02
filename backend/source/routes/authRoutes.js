import express from 'express'
import registerController from '../controllers/registerController.js'
import loginController from '../controllers/loginController.js'
import asyncHandler from '../utils/asyncHandler.js'
const router = express.Router()

//register a user
router.post("/register",asyncHandler(registerController));

//for login a user
router.post("/login",asyncHandler(loginController));

export default router;