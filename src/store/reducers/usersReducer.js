import { userTypes } from "../constants/action-types";

const initialState = {
    user:{},
    isAuth:false,
}

const usersReducer = (state = initialState, action) =>{
    const {type, payload} = action;

    switch (type) {
        case userTypes.SIGNUP_USER :
            return {...state, user: payload, isAuth:true};

        case userTypes.LOGIN_USER:
            return {...state, user: payload, isAuth:true};

        case userTypes.LOGOUT_USER:
            return {...state, user: payload, isAuth:false};

        case userTypes.PROFILE_USER:
            return {...state, user: payload};

        case userTypes.PROFILEPIC_USER:
            return {...state, user: payload};

        case userTypes.AUTHENTICATE_USER:
            return {...state, isAuth: payload};

        case userTypes.SET_AUTH:
            return {...state, isAuth: payload};
        
        default :
            return state;
    }
}

export default usersReducer;