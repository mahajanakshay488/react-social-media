import { combineReducers } from "redux";
import blogs from "./blogsReducer";
import posts from "./postsReducer";
import users from './usersReducer';
import chat from './chatReducer';

const reducers = combineReducers({
    users,
    posts,
    blogs,
    chat
});

export default reducers;