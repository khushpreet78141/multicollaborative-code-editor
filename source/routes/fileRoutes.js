import express from 'express'
import auth from '../middleware/authMiddleware.js';
import requireMember from '../middleware/Authorization/requireMember.js';
import getAllFilesController from '../controllers/getAllFilesController.js'
import getFileContentController from '../controllers/getFileContentController.js'
const router = express.Router();


//to get all the files
router.get("/allFiles/:roomId",auth,requireMember,getAllFilesController);

//get content from single file
router.get("/fileContent/:roomId/:fileId",auth,requireMember,getFileContentController);
export default router;


