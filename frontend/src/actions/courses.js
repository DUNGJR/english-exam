import * as api from "../api/courses";

export const getStudy = () => async (dispatch) => {
  try {
    const { data } = await api.fetchStudy();
    dispatch({ type: "FETCH_ALL_STUDY", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createStudy = (study) => async (dispatch) => {
  try {
    const { data } = await api.createStudy(study);
    dispatch({ type: "CREATE_STUDY", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateStudy = (id, study) => async (dispatch) => {
  try {
    const { data } = await api.updateStudy(id, study);
    dispatch({ type: "UPDATE_STUDY", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteStudy = (id) => async (dispatch) => {
  try {
    await api.deleteStudy(id);
    dispatch({ type: "DELETE_STUDY", payload: id });
  } catch (error) {
    console.log(error);
  }
};
