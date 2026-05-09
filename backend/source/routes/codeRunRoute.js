import express from 'express'
import codeRunController from '../controllers/codeRunController.js';
const router = express.Router();

router.post('/run',codeRunController);
export default router;