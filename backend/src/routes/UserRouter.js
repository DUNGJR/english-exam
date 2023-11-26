import express from 'express';
const router = express.Router();
import {postPosts,getPosts} from '../controllers/UserController.js';


// Route for Save a new Course
router.post('/', postPosts);
router.get('/', getPosts);

export default router;
