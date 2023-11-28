import { UserModel } from "../models/UserModel.js";

// Route for Save a new Course
export const postPosts = (req, res) => {
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
export const getPosts = async (req, res) => {
  try {
    const user = await UserModel.find({});
    res.status(200).json({
      count: user.length,
      data: user,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
