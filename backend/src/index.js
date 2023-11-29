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
app.use("/user", UserRouter);
app.use("/api", QuestionRouter);

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
            password: bcrypt.hashSync(req.body.password, salt)
          })
          res.json({status: 'ok'})
        } catch (error) {
          res.json({status: 'error',error})
        }
  })
  
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
                }, 'secret123');
  
                return res.json({ status: 'ok', user: token });
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
  
  
  app.get('/user', async (req, res) => {
    try {
      // Lấy dữ liệu từ MongoDB
      const userData = await UserModel.findOne({email});
      if (!userData) {
        return res.status(404).json({ message: 'Không tìm thấy người dùng' });
      }
      // Trả về dữ liệu người dùng (bao gồm name, email, và password)
      const { name, email, password } = userData;
      res.json({ name, email, password });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi trong quá trình lấy dữ liệu' });
    }
  });
  
  