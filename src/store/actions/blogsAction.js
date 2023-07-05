import blogsService from '../../services/blogs.service';
import { blogTypes } from '../constants/action-types';

export const fetchBlogers = () => async (dispatch) =>{
    try {
        const res = await blogsService.fetchBlogers();

        dispatch({
            type: blogTypes.FETCH_ALL_BLOGERS,
            payload: res.data.value,
        })

        return Promise.resolve(res.data);

    } catch (error) {
        return Promise.reject(error);
    }
}

export const fetchBloger = (username) => async (dispatch) =>{
    try {
        const res = await blogsService.fetchBloger(username);

        dispatch({
            type: blogTypes.FETCH_BLOGER,
            payload: res.data.value,
        })

        return Promise.resolve(res.data);

    } catch (error) {
        return Promise.reject(error);
    }
}

export const switchMode = () => async (dispatch) =>{
    
        dispatch({
            type: blogTypes.SWITCH_MODE,
            payload: {},
        })
}
