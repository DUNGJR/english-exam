import Questions from "../models/QuestionModel.js";
import Results from "../models/ResultModel.js";
import questions, { answers } from "../data/data.js";

export const getQuestions = async (req, res) => {
  try {
    const q = await Questions.find();
    res.json(q);
  } catch (error) {
    res.json({ error });
  }
};

export const postQuestions = async (req, res) => {
  try {
    const documents = [{ questions, answers }];

    await Questions.insertMany(documents);
    res.json({ msg: "Data Saved Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
};

export const deleteQuestions = async (req, res) => {
  try {
    await Questions.deleteMany();
    res.json({ msg: "Questions Deleted Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
};

export const getResult = async (req, res) => {
  try {
    const r = await Results.find();
    res.json(r);
  } catch (error) {
    res.json({ error });
  }
};

export const storeResult = async (req, res) => {
  try {
    const { username, result, attempts, points, achived } = req.body;
    if (!username && !result) throw new Error("Data Not Provided...!");
    const newResult = {
      username: username,
      result: result,
      attempts: attempts,
      points: points,
      achived: achived,
    };
    await Results.create(newResult);
    res.json({ msg: "Result Saved Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
};

export const deleteResult = async (req, res) => {
  try {
    await Results.deleteMany();
    res.json({ msg: "Result Deleted Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
};
