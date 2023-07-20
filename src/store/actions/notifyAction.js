import notifyService from "../../services/notify.service";
import { notifyTypes } from "../constants/action-types";

export const fetchNotifys = () => async (dispatch) =>{
    try {
        const res = await notifyService.fetchNotifyForUser();

        dispatch({
            type: notifyTypes.FETCH_NOTIFYS,
            payload: res.data.value,
        })

        return Promise.resolve(res.data);

    } catch (error) {
        return Promise.reject(error);
    }
}

export const addNotify = (credentials) => async (dispatch) =>{
    try {
        const res = await notifyService.addNotify(credentials);

        dispatch({
            type: notifyTypes.ADD_NOTIFY,
            payload: res.data.value,
        })

        return Promise.resolve(res.data);

    } catch (error) {
        return Promise.reject(error);
    }
}

export const removeNotify = (notifyid) => async (dispatch) =>{
    try {
        const res = await notifyService.clearNotify(notifyid);

        dispatch({
            type: notifyTypes.REMOVE_NOTIFY,
            payload: res.data.value,
        })

        return Promise.resolve(res.data);

    } catch (error) {
        return Promise.reject(error);
    }
}