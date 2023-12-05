import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import CourseRoute from "./routes/CourseRoute.js";
import UserRouter from "./routes/UserRouter.js";
import QuestionRouter from "./routes/QuestionRoute.js";
import bcrypt, { hash, compare } from 'bcrypt';
import cors from "cors";
import bodyParser from "body-parser";
import { UserModel } from './models/UserModel.js';
import dotenv from "dotenv";
import morgan from "morgan";
import jwt from "jsonwebtoken"
import { StudyModel } from "./models/StudyModel.js";
import StudyRouter from "./routes/StudyRoute.js";

const app = express();

app.use(morgan("tiny"));

app.use(bodyParser.json());

app.use(express.json());

app.use(cors());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Nhom5");
});

app.use("/course", CourseRoute);
app.use("/api", QuestionRouter);
app.use("/alluser", UserRouter);
app.use("/study", StudyRouter);

// Connect to database
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });


  var salt = bcrypt.genSaltSync(10);

  app.post('/register', async (req,res)=>{
        console.log(req.body)
        try {
          await UserModel.create({
            name: req.body.name,
            email:req.body.email,
            password: bcrypt.hashSync(req.body.password, salt),
            age: req.body.age || null,        
            bio: req.body.bio || '',         
            dob: req.body.dob || null,   
            gender: req.body.gender || '', 
            avata: req.body.avata || '',
            admin: false,
          })
          res.json({status: 'ok'})
        } catch (error) {
          res.json({status: 'error',error})
        }
  })



  
  
  app.post('/edituser', async (req, res) => {
    const userEmail = req.body.email;
    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            { email: userEmail },
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    age: req.body.age !== null ? req.body.age : null,
                    dob: req.body.dob !== null ? new Date(req.body.dob) : null,
                    gender: req.body.gender || '',
                    bio: req.body.bio || '',
                    avata: req.body.avata || '',
                    admin: req.body.admin || 'false',
                },
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        res.json({ status: 'ok', user: updatedUser });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});
  
  app.post('/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
  
        if (user) {
            // So sánh mật khẩu nhập vào với mật khẩu đã mã hóa
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (isMatch) {
                const token = jwt.sign({
                    name: user.name,
                    email: user.email,
                    age: user.age !== null ? req.body.age : null,
                    dob: user.dob !== null ? new Date(req.body.dob) : null,
                    gender: user.gender || '',
                    bio: user.bio || '',
                    avata: user.avata || '', 
                    admin: req.body.admin || '',
                }, 'secret123');
  
                return res.json({ status: 'ok', user: token});
            } else {
                return res.json({ status: 'error', user: false, message: 'Mật khẩu không đúng' });
            }
        } else {
            return res.json({ status: 'error', user: false, message: 'Không tìm thấy người dùng' });
        }
    } catch (error) {
        return res.json({ status: 'error', user: false, message: 'Đã xảy ra lỗi' });
    }
  });
  
  
  app.get('/users', async (req, res) => {
    try {
      // Lấy token từ tiêu đề Authorization
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const decodedToken = jwt.verify(token, 'secret123'); // Thay thế 'your-secret-key' bằng secret key bạn đã sử dụng khi tạo token
      const userData = await UserModel.findOne({ email: decodedToken.email });
      if (!userData) {
        return res.status(404).json({ message: 'Không tìm thấy người dùng' });
      }
      // Trả về dữ liệu người dùng (bao gồm name, email, và password)
      const { name, email, password, age, dob, gender, bio, avata, admin} = userData;
      return res.json({ name, email, password, age, dob, gender, bio, avata, admin});
    } catch (error) {
      console.error(error);
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
      }
      res.status(500).json({ message: 'Lỗi Rồi ' });
    }
  });
  

 
 