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
    age: {
      type: Number,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
    },
    bio: {
      type: String,
    },
    avata: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("UserModel", userSchema);
