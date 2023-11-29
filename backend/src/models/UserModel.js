import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // phone: {
    //   type: Number,
    //   required: true,
    // },
    // cpassword: {
    //   type: String,
    //   required: true,
    // },
    // isAdmin: {
    //   type: Boolean,
    //   default: false,
    //   required: true,
    // },
    // access_token: {
    //   type: String,
    //   required: true,
    // },
    // refresh_token: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("UserModel", userSchema);
