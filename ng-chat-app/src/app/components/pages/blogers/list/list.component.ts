import { Component, NgZone, OnInit, Inject } from '@angular/core';
import {Dialog, DialogRef, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';

import { ChatService } from 'src/app/services/chat.service';
import { SocketsService } from 'src/app/services/sockets.service';
import { UserService } from 'src/app/services/user.service';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { MatIcon } from '@angular/material/icon';
import { MsgComponent } from '../../chats/msg/msg.component';
import { FormsModule } from '@angular/forms';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  blogers: Array<any>=[];
  loginUsers: Array<any>=[];
  
  constructor(
    private users: UserService,
    public dialog: Dialog,
    private sockets: SocketsService,
    private ngZone: NgZone,
    public layouts: LayoutService
  ){}

  ngOnInit(): void {
      this.fetchBlogers();
      let logins = sessionStorage.getItem('logins');
      if(logins){
        this.loginUsers = JSON.parse(logins);
      }

      this.getBlogers();

      setTimeout(() => {
        this.fetchBlogers();
      }, 900);

      this.sockets.$LoginUsers.subscribe((v:Array<any>)=>{
        sessionStorage.setItem('logins', JSON.stringify(v));
        this.ngZone.run(()=>{
          this.loginUsers = v;
          
          console.log('logins', this.loginUsers);
        });  
       });
  }

  getBlogers(){
    this.users.$blogers.subscribe((v:any)=>{

      this.users.user.subscribe((u:any)=>{
        this.ngZone.run(()=>{
          v = v.filter((e:any)=> e.username !== u.username);
          this.blogers = v;
        })
        console.log(v, u,this.blogers);  
      })
      
    });
  }


  openDialog(b:any): void {
    const dialogRef = this.dialog.open<string>(AppDialog, {
      width: '250px',
      data: {bloger: b}
    });

    dialogRef.closed.subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  fetchBlogers(){
    this.users.fetchUsers().subscribe((v:any)=>{
      
      this.users.$blogers.next(v.value);
    });
  }

  showBloger(b:any){
    console.log(b);
    this.openDialog(b);
  }

  
}


// Dialog Class

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [NgIf, FormsModule]
})
export class AppDialog implements OnInit{
  connected:boolean= false;
  msg:any= "Hey";
  show:boolean = false;
  loginUsers:Array<any>=[];

  constructor(
    public dialogRef: DialogRef<string>, 
    @Inject(DIALOG_DATA) public data: any,
    private users: UserService,
    private chats: ChatService,
    private sockets: SocketsService,
    private ngZone: NgZone
  ) {
  }

  ngOnInit(): void {
    this.msg = 'Hey ' + this.data.bloger.name; 
    this.users.user.subscribe((v:any)=>{
      if(v.msgs.some((e:any)=> e.another == this.data.bloger.username)){
        this.connected = true;
      }else{
        this.connected = false;
      }
    });
  }



  showM(){
    this.show = !this.show;
  }

  sendMsg(){
    let reqMsg={
      msg: this.msg,
      reciever: this.data.bloger.username
    }

    this.chats.sendMessege(reqMsg).subscribe((v:any)=>{
      let mesg = v.value;

      this.connected = true;

      let newMsg ={
        author: mesg.author,
        reciever: mesg.reciever,
        chatid: mesg.chatid
      }

      let notific = {
        author: mesg.author, 
        reciever: mesg.reciever, 
        chatid: mesg.chatid, 
        msgid: mesg._id
      }

      this.chats.addNotification(notific).subscribe((n:any)=>{
        console.log(n, 'add NOtify');
        this.sockets.startNewChat(newMsg); 
      });

      console.log(v);
    });

  }
  
}
