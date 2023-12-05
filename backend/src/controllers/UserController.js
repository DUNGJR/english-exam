import { UserModel } from "../models/UserModel.js";
import bcrypt, { hash, compare } from 'bcrypt';
import mongoose from "mongoose";

// Route for Save a new Course
export const postUser = (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      cpassword,
      isAdmin,
      access_token,
      refresh_token,
    } = req.body;
    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !cpassword ||
      !isAdmin ||
      !access_token ||
      !refresh_token
    ) {
      return res.status(400).send({ message: "Send all required" });
    }
    UserModel.findOne({ email: email }).then((userExist) => {
      if (userExist) {
        return res.status(400).send({ message: "Email already exists" });
      }

      const user = new UserModel({
        name,
        email,
        phone,
        password,
        cpassword,
        isAdmin,
        access_token,
        refresh_token,
      });
      user.save().then(() => {
        return res.status(201).json({ message: "Email successfully" });
      });
    });

    // const user = await UserModel.create(newCourse);
    // return res.status(201).json(user);
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
};

// Route for Get All Courses from database
export const getUser = async (req, res) => {
  try {
    const user = await UserModel.find({});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};




export const postUsers = async (req,res)=>{
var salt = bcrypt.genSaltSync(10);

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
            admin: req.body.admin || '',
          })
          res.json({status: 'ok'})
        } catch (error) {
          res.json({status: 'error',error})
        }
  }

  

  export const editPostUsers = async (req, res) => {
    
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
};


export const loginUsers = async (req, res) => {

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
};
  
  
  
  
export const getUsers = async (req, res) => {
  
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
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No user with that id");
    }

    await UserModel.findByIdAndDelete(id);
    return res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
