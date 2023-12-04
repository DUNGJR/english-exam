import { combineReducers, configureStore } from '@reduxjs/toolkit';

/** call reducers */
import questionReducer from './question_reducer';
import resultReducer from './result_reducer';
import posts from "../reducers/posts";
import users from "../reducers/users";


const rootReducer = combineReducers({
    users: users,
    posts: posts,
    questions : questionReducer,
    result : resultReducer
})

/** create store with reducer */
export default configureStore({ reducer : rootReducer});