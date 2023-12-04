import axios from "axios";

const url = "http://localhost:3001/alluser";

export const fetchUser = () => axios.get(url);

export const createUser = (newUser) => axios.post(url, newUser);

export const updateUser = (id, updatedUser) =>
  axios.patch(`${url}/${id}`, updatedUser);

export const deleteUser = (id) => axios.delete(`${url}/${id}`);
