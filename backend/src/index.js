import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import CourseRoute from './routes/CourseRoute.js';
import UserRouter from './routes/UserRouter.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'

const app = express();
  
app.use(bodyParser.json());

app.use(express.json());

app.use(cors());

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Nhom5');
});

app.use('/course', CourseRoute);
app.use('/user', UserRouter);

// Connect to database
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
