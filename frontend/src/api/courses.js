import axios from "axios";

const url = "http://localhost:3001/study";

export const fetchStudy= () => axios.get(url);

export const createStudy= (newStudy) => axios.post(url, newStudy);

export const updateStudy= (id, updatedStudy) =>
  axios.patch(`${url}/${id}`, updatedStudy);

export const deleteStudy= (id) => axios.delete(`${url}/${id}`);
