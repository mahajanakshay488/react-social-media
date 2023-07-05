import { postTypes } from "../constants/action-types";

const initialState = {
    posts:[],
    activePost:{},
    comments:[]
}

const postsReducer = (state = initialState, action) =>{
    const {type, payload} = action;

    switch (type) {

        case postTypes.ADD_POST :{
            const posts = [...state.posts, payload];
            return {...state, posts};
        }
        case postTypes.FETCH_ALL_POST:{
            return {...state, posts: payload};
        }
        case postTypes.ACTIVE_POST:{
            return {...state, activePost: payload};
        }
        case postTypes.LIKE_POST:{
            const post = payload;
            return {...state, activePost: post};
        }
        case postTypes.COMMENT_POST:{
            const post = payload;
            return {...state, activePost: post};
        }
        case postTypes.FETCH_COMMENTS:{
            const comments = payload;
            return {...state, comments: comments};
        }
        default :
            return state;
    }
}

export default postsReducer;