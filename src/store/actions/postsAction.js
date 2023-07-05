import { postTypes } from "../constants/action-types";
import postService from "../../services/post.service";

export const addPost = (credentials) => async (dispatch) =>{
    try {
        const res = await postService.addPost(credentials);

        dispatch({
            type: postTypes.ADD_POST,
            payload: res.data.value,
        })

        return Promise.resolve(res.data.value);

    } catch (error) {
        return Promise.reject(error);
    }
}

export const fetchPosts = () => async (dispatch) =>{
    try {
        const res = await postService.fetchPosts();

        dispatch({
            type: postTypes.FETCH_ALL_POST,
            payload: res.data.value,
        })

        return Promise.resolve(res.data.value);

    } catch (error) {
        return Promise.reject(error);
    }
}

export const fetchPost = (postid) => async (dispatch) =>{
    try {
        const res = await postService.fetchPost(postid);

        dispatch({
            type: postTypes.ACTIVE_POST,
            payload: res.data.value,
        });

        return Promise.resolve(res.data);

    } catch (error) {
        return Promise.reject(error);
    }
}

export const likePost = (postid) => async (dispatch) =>{
    try {
        const res = await postService.likePost(postid);

        dispatch({
            type: postTypes.LIKE_POST,
            payload: res.data.value,
        })

        return Promise.resolve(res.data.value);

    } catch (error) {
        return Promise.reject(error);
    }
}

export const addComment = (postid, credentials) => async (dispatch) =>{
    try {
        const res = await postService.addComment(postid, credentials);

        dispatch({
            type: postTypes.COMMENT_POST,
            payload: res.data.post,
        })

        return Promise.resolve(res.data);

    } catch (error) {
        return Promise.reject(error);
    }
}

export const fetchComments = (postid) => async (dispatch) =>{
    try {
        const res = await postService.fetchComments(postid);

        dispatch({
            type: postTypes.FETCH_COMMENTS,
            payload: res.data.value,
        })

        return Promise.resolve(res.data);

    } catch (error) {
        return Promise.reject(error);
    }
}