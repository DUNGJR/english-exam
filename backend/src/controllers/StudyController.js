import express from "express";
import { StudyModel } from "../models/StudyModel.js";
import mongoose from "mongoose";
 
 // CREATE (POST)
export const postStudy = async (req, res) => {
    try {
      const { title, desc, videos } = req.body;
      const newStudy = new StudyModel({
        title,
        desc,
        videos,
      });
  
      await newStudy.save();
  
      res.json({newStudy});
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  };
  
  // READ (GET all)
  export const getStudy = async (req, res) => {
    try {
      const study = await StudyModel.find();
      res.json(study);
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  };
  
  // READ (GET by ID)
//   export const getOneStudy = async (req, res) => {
//     try {
//       const study = await StudyModel.findById(req.params.id);
//       if (!study) {
//         return res.status(404).json({ status: 'error', message: 'Study not found' });
//       }
//       res.json( study );
//     } catch (error) {
//       res.status(500).json({ status: 'error', error: error.message });
//     }
//   };
  
  // UPDATE (PUT)
  export const updateStudy = async (req, res) => {
    try {
      const { title, desc, videos } = req.body;
  
      const updatedStudy = await StudyModel.findByIdAndUpdate(req.params.id, {
        title,
        desc,
        videos,
      }, { new: true });
  
      if (!updatedStudy) {
        return res.status(404).json({ status: 'error', message: 'Study not found' });
      }
  
      res.json({ status: 'ok', data: updatedStudy });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  };
  
  // DELETE
  export const deleteStudy = async (req, res) => {
    try {
      const deletedStudy = await StudyModel.findByIdAndDelete(req.params.id);
      if (!deletedStudy) {
        return res.status(404).json({ status: 'error', message: 'Study not found' });
      }
      res.json({ status: 'ok', data: deletedStudy });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  };
  
  
