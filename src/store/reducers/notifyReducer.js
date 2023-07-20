import { notifyTypes } from "../constants/action-types";

const initialState = {
    notifications:[],
}

const notifyReducer = (state = initialState, action) =>{
    const {type, payload} = action;

    switch (type) {
        case notifyTypes.ADD_NOTIFY :{
            return state;
        }    
        case notifyTypes.FETCH_NOTIFYS :{
            return {...state, notifications: payload};
        }
        case notifyTypes.REMOVE_NOTIFY :{
            return state;
        }
        default :
            return state;
    }
}

export default notifyReducer;