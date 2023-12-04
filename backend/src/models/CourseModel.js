import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    part: {
      type: Number,
      required: true,
    },
    question: {
      type: Number,
      required: true,
    },
    questions: [
      {
        content: String,
        options: [String],
        correctAnswer: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Course = mongoose.model("Course", courseSchema);
