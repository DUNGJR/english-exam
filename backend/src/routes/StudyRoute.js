import express from 'express';
const router = express.Router();
import {postStudy,getStudy,updateStudy,deleteStudy} from '../controllers/StudyController.js';


// Route for Save a new Course
router.post('/', postStudy);
router.get('/', getStudy);
router.patch('/:id', updateStudy);
router.delete('/:id', deleteStudy);

export default router;
