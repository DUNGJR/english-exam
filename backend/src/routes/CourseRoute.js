import express from 'express';
const router = express.Router();
import {postCourses,getCourses,updateCourses,deleteCourses} from '../controllers/CourseController.js';


// Route for Save a new Course
router.post('/', postCourses);
router.get('/', getCourses);
router.patch('/:id', updateCourses);
router.delete('/:id', deleteCourses);

export default router;
