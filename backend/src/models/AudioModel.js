const mongoose = require("mongoose");

const audioSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  duration: { type: Number },
});

export const AudioModel = mongoose.model("Audio", audioSchema);