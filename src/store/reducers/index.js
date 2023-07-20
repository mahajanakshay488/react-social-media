import { combineReducers } from "redux";
import blogs from "./blogsReducer";
import posts from "./postsReducer";
import users from './usersReducer';
import chat from './chatReducer';
import notifys from './notifyReducer';

const reducers = combineReducers({
    users,
    posts,
    blogs,
    chat,
    notifys
});

export default reducers;