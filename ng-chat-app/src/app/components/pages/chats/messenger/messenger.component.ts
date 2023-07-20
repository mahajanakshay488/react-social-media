import { Component, NgZone, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { LayoutService } from 'src/app/services/layout.service';
import { SocketsService, sockett } from 'src/app/services/sockets.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {

  openChat: any = false;

  constructor(
    private users: UserService,
    private chats: ChatService,
    private sockets: SocketsService,
    private ngzone: NgZone,
    public layouts: LayoutService 

  ){  }

  ngOnInit(): void {

    this.layouts.$openChat.subscribe((v:any)=>{
      this.ngzone.run(()=>{
        this.openChat = v;
      });
      console.log(this.openChat);
    });
  
    sockett.on('getUsers', users=>{

      let alu: Array<any>=[]
        
        users.forEach((v:any) => {
            alu.push(v.userId);
        })
          
          console.log('loginUsers ALu', alu);

      this.sockets.$LoginUsers.next(alu);
      console.log('users', users);
    });
    
    this.sockets.receiveMessages().subscribe((v: any) => {
      
        let msg = {
          author: v.author,
          reciever: v.reciever,
          chatid: v.chatid,
          msgid: v.msgid,
          msg: v.text
        }
        console.log(v, msg);

        
        this.sockets.$messege.next(msg);
      
		});

    this.sockets.getTypingUser().subscribe((v:any)=>{
      console.log('getTying', v);
      this.chats.$typing.next(v);
    });

    this.sockets.getNewChat().subscribe((v:any)=>{
      console.log('newChat', v);
      this.chats.$newchat.next(v);
    })
    
  }

}
