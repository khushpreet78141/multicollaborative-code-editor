import express from 'express'
import registerController from '../controllers/registerController.js'
import loginController from '../controllers/loginController.js'
import auth from '../middleware/authMiddleware.js'
import asyncHandler from '../utils/asyncHandler.js'
import getUserDetailsController from '../controllers/getUserDetailsController.js'

const router = express.Router();

//register a user
router.post("/register",asyncHandler(registerController));

//for login a user
router.post("/login",asyncHandler(loginController));

//getting userDetails after login/register
router.get("/getUserDetails/:userId",auth,asyncHandler(getUserDetailsController));



export default router;