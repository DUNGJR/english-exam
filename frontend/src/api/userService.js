import axios from "axios";

const url = "http://localhost:3001/course";

export const fetchCourse = () => axios.get(url);