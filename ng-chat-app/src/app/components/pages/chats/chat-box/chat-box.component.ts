import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { SocketsService, sockett } from 'src/app/services/sockets.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  chat:any;
  loginUsers:Array<String>=[];

  constructor( 
    private sockets: SocketsService,
    private chats: ChatService,
  ){}

  
  ngOnInit(): void {
    this.sockets.$LoginUsers.subscribe((v:Array<String>)=>{
      this.loginUsers =v;
    });

    this.chats.$Chat.subscribe(v =>{
      this.chat = v;
    });
  }


}
