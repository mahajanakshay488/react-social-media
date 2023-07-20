import http from "./http-common";

class NotifyService{

    addNotify(credentials){
        return http.post('/notify/add', credentials);
    }

    fetchNotifyForUser(){
        return http.get(`/notify/notifications/user`);
    }

    clearNotify(id){
        return http.delete(`/notify/clear/${id}`);
    }
}

export default new NotifyService;