import { blogTypes } from "../constants/action-types";

const initialState = {
    blogers:[],
    bloger:{},
    darkMode:false
}

const blogsReducer = (state = initialState, action) =>{
    const {type, payload} = action;

    switch (type) {
        case blogTypes.FETCH_ALL_BLOGERS :{
            return {...state, blogers: payload};
        }    
        case blogTypes.FETCH_BLOGER :{
            return {...state, bloger: payload};
        }
        case blogTypes.SWITCH_MODE :{
            var mode = (state.darkMode)?false:true;
            return {...state, darkMode:mode};
        }
        default :
            return state;
    }
}

export default blogsReducer;