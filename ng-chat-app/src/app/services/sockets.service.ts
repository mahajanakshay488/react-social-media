import { Injectable, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import {Observable, Subject} from 'rxjs';

const socket = io('ws://localhost:8900');
export const sockett = io('ws://localhost:8900');

@Injectable({
  providedIn: 'root'
})
export class SocketsService implements OnInit {
  
  $messege = new Subject<any>();
  $LoginUsers = new Subject<Array<any>>();

  constructor() {
   }

  ngOnInit(): void {
  }

   addUser(username: String){
    socket.emit("addUser", username);
  }

  removeUser(){
    socket.emit('userLogout');
  }

  typingUser(chat:any){
    socket.emit('typingUser', chat);
  }

  getTypingUser(): Observable<any> {
		return new Observable(observer => {
			socket.on('typingTrue', (data) => {
				observer.next(data);
			});

			return () => {
				socket.disconnect();
			};
		});
  }

  sendMessege(credentials:any){
    socket.emit('sendMessege', {
      userId: credentials.userId,
      recieverId: credentials.recieverId,
      chatid: credentials.chatid,
      msgid: credentials.msgid,
      text: credentials.msg
    });
  }

  receiveMessages(): Observable<any> {
		return new Observable(observer => {
			socket.on('gettMessege', (data) => {
				observer.next(data);
			});

			return () => {
				socket.disconnect();
			};
		});
  }

  startNewChat(chat:any){
    socket.emit('startChat', chat);
  }


  getNewChat(): Observable<any> {
		return new Observable(observer => {
			socket.on('getChatsec', (data) => {
				observer.next(data);
			});

			return () => {
				socket.disconnect();
			};
		});
  }
}
