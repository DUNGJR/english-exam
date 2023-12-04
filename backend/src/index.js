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



  
  app.post('/course/detail', async (req, res) => {
    try {
      const { title, url, description } = req.body;
      // Kiểm tra xem URL đã tồn tại chưa
      const existingVideo = await Video.findOne({ url });
      if (existingVideo) {
        return res.status(400).json({ status: 'error', message: 'URL already exists' });
      }
      // Nếu URL chưa tồn tại, tiến hành tạo mới Video
      await Video.create({
        title,
        url,
        description: description || null,
      });
  
      res.json({ status: 'ok' });
    } catch (error) {
      res.status(500).json({ status: 'error', error });
    }
  });
  
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
                    admin: req.body.admin || '',
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
  

  // CREATE (POST)
app.post('/study', async (req, res) => {
  try {
    const { title, desc, videos } = req.body;

    const newStudy = new StudyModel({
      title,
      desc,
      videos,
    });

    await newStudy.save();

    res.json({newStudy});
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// READ (GET all)
app.get('/study', async (req, res) => {
  try {
    const study = await StudyModel.find();
    res.json(study);
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// READ (GET by ID)
app.get('/studies/:id', async (req, res) => {
  try {
    const study = await StudyModel.findById(req.params.id);
    if (!study) {
      return res.status(404).json({ status: 'error', message: 'Study not found' });
    }
    res.json( study );
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// UPDATE (PUT)
app.put('/studies/:id', async (req, res) => {
  try {
    const { title, desc, videos } = req.body;

    const updatedStudy = await StudyModel.findByIdAndUpdate(req.params.id, {
      title,
      desc,
      videos,
    }, { new: true });

    if (!updatedStudy) {
      return res.status(404).json({ status: 'error', message: 'Study not found' });
    }

    res.json({ status: 'ok', data: updatedStudy });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// DELETE
app.delete('/studies/:id', async (req, res) => {
  try {
    const deletedStudy = await StudyModel.findByIdAndDelete(req.params.id);
    if (!deletedStudy) {
      return res.status(404).json({ status: 'error', message: 'Study not found' });
    }
    res.json({ status: 'ok', data: deletedStudy });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

