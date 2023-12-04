import express from 'express';
const router = express.Router();
import {postUser,getUser,deleteUser,postUsers,editPostUsers,loginUsers,getUsers} from '../controllers/UserController.js';


// Route for Save a new Course
router.post('/', postUser);
router.get('/', getUser);
router.patch('/:id', editPostUsers);
router.delete('/:id', deleteUser);


router.post('/register', postUsers);
router.post('/edituser', editPostUsers);
router.post('/login', loginUsers);
// router.get('/users', getUsers);



export default router;


  