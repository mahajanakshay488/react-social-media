import userService from '../../services/user.service'
import { userTypes } from '../constants/action-types'

export const signup = (credentials) => async (dispatch) => {

    try {
        
        const res = await userService.signup(credentials);

        dispatch({
            type: userTypes.LOGIN_USER,
            payload: res.data.value
        });

        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error);
    }

};

export const login = (credentials) => async (dispatch) => {

    try {
        
        const res = await userService.login(credentials);

        dispatch({
            type: userTypes.LOGIN_USER,
            payload: res.data.value
        });

        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error);
    }

};

export const profile = () => async (dispatch) => {

    try {
        
        const res = await userService.profile();

        dispatch({
            type: userTypes.PROFILE_USER,
            payload: res.data.value
        });

        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error);
    }

};


export const updateProfilepic = (credentials) => async (dispatch) => {

    try {
        
        const res = await userService.updateProfilepic(credentials);

        dispatch({
            type: userTypes.PROFILEPIC_USER,
            payload: res.data.value
        });

        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error);
    }

};


export const logout = () => async (dispatch) => {

    try {
        
        const res = await userService.logout();

        dispatch({
            type: userTypes.LOGOUT_USER,
            payload: {}
        });

        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error);
    }

};

export const checkAuth = () => async (dispatch) => {

    try {
        
        const res = await userService.checkLogedin();

        dispatch({
            type: userTypes.AUTHENTICATE_USER,
            payload: res.data.isAuthenticated
        });

        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error);
    }

};

export const setAuth = (value) => async (dispatch) => {

    try {

        dispatch({
            type: userTypes.SET_AUTH,
            payload: value
        });

        // return Promise.resolve(res.data);
    } catch (error) {
        // return Promise.reject(error);
    }

};