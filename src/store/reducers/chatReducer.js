import { chatTypes } from "../constants/action-types";

const initialState = {
    another: '',
    loginUsers: [],
    chatsec:[],
    chatting:[]
};

const chatReducer = (state = initialState, action) =>{
    const {type, payload} = action;

    switch (type) {
        case chatTypes.FETCH_CHATSEC :{
            return {...state, chatsec: payload};
        }    
        case chatTypes.FETCH_MESSEGES :{
            
            return {...state, chatting:payload.msgs, another:payload.another};
        }
        case chatTypes.SEND_MESSEGE :{
            // return {
            //     ...state,
            //     chatting:state.chatting.concat(payload)
            // };

            console.log(payload);
            return state;
        }
        case chatTypes.SET_LOGINUSERS :{
            return {...state, loginUsers: payload};
        }
        default :
            return state;
    }
}

export default chatReducer;