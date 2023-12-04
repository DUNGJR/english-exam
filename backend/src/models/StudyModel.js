import mongoose from "mongoose";

const studySchema = new mongoose.Schema({
  title: {
    type: String,
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
      },
      videodesc: {
        type: String,
      },
    },
  ], // Array of video objects
});

export const StudyModel = mongoose.model("StudyModel", studySchema);
