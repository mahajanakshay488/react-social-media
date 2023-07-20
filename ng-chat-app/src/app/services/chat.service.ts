import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject, BehaviorSubject} from 'rxjs';

const options = {
  withCredentials: true,
  origin: true,
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
const uri = 'http://localhost:5000/chat';
const notifyuri = 'http://localhost:5000/notify'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  $Messeges = new Subject<any>();
  $Chat = new Subject<any>();
  $Notifications= new Subject<any>();
  $typing = new Subject<any>();
  $newchat = new Subject<any>();

  constructor(
    private http: HttpClient
  ) { }

  fetchMesseges(chatid: String){
    return this.http.get(`${uri}/${chatid}`, options);
  }

  sendMessege(msg: any){
    return this.http.post(`${uri}/message/${msg.reciever}`, msg, options);
  }

  fetchChat(){
    return this.http.get(`${uri}/chatsec`, options);
  }

  addNotification(credentials: any){
    return this.http.post(`${notifyuri}/add`, credentials, options);
  }

  fetchNotifications(){
    return this.http.get(`${notifyuri}/notifications/user`,options);
  }

  clearNotifications(notifyid: String){
    return this.http.delete(`${notifyuri}/clear/${notifyid}`,options);
  }
}
