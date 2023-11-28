import * as api from "../api";

export const getCourse = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCourse();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createCourse = (course) => async (dispatch) => {
  try {
    const { data } = await api.createCourse(course);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateCourse = (id, course) => async (dispatch) => {
  try {
    const { data } = await api.updateCourse(id, course);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCourse = (id) => async (dispatch) => {
  try {
    await api.deleteCourse(id);
    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error);
  }
};
