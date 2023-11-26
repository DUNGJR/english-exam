import express from 'express';
const router = express.Router();
import {postCourses,getCourses,updateCourses} from '../controllers/CourseController.js';


// Route for Save a new Course
router.post('/', postCourses);
router.get('/', getCourses);
router.patch('/:id', updateCourses);


export default router;
