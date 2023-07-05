import chatService from "../../services/chat.service";
import { chatTypes } from "../constants/action-types";

export const fetchChatsec = () => async (dispatch) =>{
    try {
        const res = await chatService.fetchChatsec();

        dispatch({
            type: chatTypes.FETCH_CHATSEC,
            payload: res.data.value,
        })

        return Promise.resolve(res.data);

    } catch (error) {
        return Promise.reject(error);
    }
}

export const fetchMesseges = (another) => async (dispatch) =>{
    try {
        const res = await chatService.fetchMesseges(another.chatid);

        dispatch({
            type: chatTypes.FETCH_MESSEGES,
            payload: {msgs: res.data.value, another: another.another},
        })

        return Promise.resolve(res.data);

    } catch (error) {
        return Promise.reject(error);
    }
}

export const sendMessage = (reciever, credentials) => async (dispatch) =>{
    try {
        const res = await chatService.sendMessage(reciever, credentials);

        dispatch({
            type: chatTypes.SEND_MESSEGE,
            payload: res.data.value,
        })

        return Promise.resolve(res.data);

    } catch (error) {
        return Promise.reject(error);
    }
}

export const setLoginUsers = (loginUsers) => async (dispatch) =>{
    try {

        dispatch({
            type: chatTypes.SET_LOGINUSERS,
            payload: loginUsers,
        })

    } catch (error) {
        console.log(error);
    }
}
