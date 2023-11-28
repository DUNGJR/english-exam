import axios from "axios";

const url = "http://localhost:3001/course";

export const fetchCourse = () => axios.get(url);

export const createCourse = (newCourse) => axios.post(url, newCourse);

export const updateCourse = (id, updatedCourse) =>
  axios.patch(`${url}/${id}`, updatedCourse);

export const deleteCourse = (id) => axios.delete(`${url}/${id}`);
