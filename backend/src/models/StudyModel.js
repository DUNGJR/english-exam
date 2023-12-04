import mongoose from "mongoose";

const studySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  videos: [
    {
      videoSchema: {
        type: String,
      },
      videotitle: {
        type: String,
        required: true,
      },
      videodesc: {
        type: String,
      },
    },
  ], // Array of video objects
});

export const StudyModel = mongoose.model("StudyModel", studySchema);
