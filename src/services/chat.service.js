import http from "./http-common";

class ChatService{

    fetchChatsec(){
        return http.get('/chat/chatsec');
    }

    fetchMesseges(chatId){
        return http.get(`/chat/${chatId}`);
    }

    sendMessage(reciever, credentials){
        return http.post(`/chat/message/${reciever}`, credentials);
    }
}

export default new ChatService;