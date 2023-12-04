import mongoose from "mongoose";

const studySchema = new mongoose.Schema({
 title: {
    type : String,
    required: true
 },
 desc: {
    type: String,
    required: true
 }
});

export const StudyModel = mongoose.model("StudyModel", studySchema);