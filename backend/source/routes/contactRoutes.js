import express from 'express'


import contactUsController from '../controllers/contactUsController.js';
const router = express.Router();

router.post("/contactUs",contactUsController)

export default router;