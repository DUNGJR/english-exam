import express from 'express';
const router = express.Router();
import {postPosts,getPosts,postUsers,editPostUsers,loginUsers,getUsers} from '../controllers/UserController.js';


// Route for Save a new Course
router.post('/', postPosts);
router.get('/', getPosts);


router.post('/register', postUsers);
router.post('/edituser', editPostUsers);
router.post('/login', loginUsers);
// router.get('/users', getUsers);



export default router;


  