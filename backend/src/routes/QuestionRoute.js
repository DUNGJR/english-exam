import express from 'express';
const router = express.Router();
import {getQuestions,postQuestions,deleteQuestions,getResult,storeResult,deleteResult} from '../controllers/QuestionController.js'

router.get('/questions', getQuestions);
router.post('/questions', postQuestions);
// router.patch('/questions/', updateQuestions);
router.delete('/questions', deleteQuestions);

router.get('/result', getResult);
router.post('/result', storeResult);
router.delete('/result', deleteResult);



export default router;
