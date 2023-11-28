import express from "express";
import { Course } from "../models/CourseModel.js";
import mongoose from "mongoose";

// Route for Save a new Course
export const postCourses = async (req, res) => {
  try {
    const { name, topic, time, part, question } = req.body;
    if (!name || !topic || !time || !part || !question) {
      return res.status(400).send({
        message: "Send all required",
      });
    }
    const newCourse = {
      name: name,
      topic: topic,
      time: time,
      part: part,
      question: question,
    };

    const course = await Course.create(newCourse);

    return res.status(201).send(course);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// Route for Get All Courses from database
export const getCourses = async (req, res) => {
  try {
    const course = await Course.find({});

    return res.status(200).json(course);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const updateCourses = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const course = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("No post with that id");
    }
    const updatedCourse = await Course.findByIdAndUpdate(
      _id,
      { ...course, _id },
      { new: true }
    );
    res.json(updatedCourse);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const deleteCourses = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No post with that id");
    }

    await Course.findByIdAndDelete(id);
    return res.status(200).send({ message: "Course deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
