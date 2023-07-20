import { Component, Input, OnInit, ViewChild, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatService } from 'src/app/services/chat.service';
import { SocketsService } from 'src/app/services/sockets.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-msg-input',
  templateUrl: './msg-input.component.html',
  styleUrls: ['./msg-input.component.scss']
})
export class MsgInputComponent implements OnInit {
  @ViewChild('form') form!: NgForm;
  @Input() loginUsers?: Array<String>;

  user: any;
  chat: any;
  typingU: any;

  constructor(
    private sockets: SocketsService,
    private users: UserService,
    private chats: ChatService,
    private ngZone: NgZone
  ){}

  ngOnInit(): void {
    this.users.$User.subscribe(v =>{
      this.user = v;
      console.log(v);
    });
    this.chats.$Chat.subscribe(v =>{
      this.chat = v;
      console.log(v);
    });
    this.getTyping();
  }

  getTyping(){
    this.chats.$typing.subscribe((v:any)=>{
      this.ngZone.run(()=>{
        this.typingU = v;
        setTimeout(() => {
          this.typingU = null;
        }, 1500);
        
      });
      console.log(this.typingU, this.chat.chatid);
    });
   }

  typing(){
    console.log('type..');
    this.sockets.typingUser(this.chat);
  }

  sendMsg(){

    const {messege} = this.form.form.value;

          let reqMsg={
            msg: messege,
            reciever: this.chat.another
          }
          this.chats.sendMessege(reqMsg).subscribe((v:any)=>{
            console.log('sentmsg', v);

            let credentials = {
              userId: this.user.username,
              recieverId: this.chat.another,
              chatid: this.chat.chatid,
              msgid: v.value._id,
              msg: v.value.msg
            }

            if(this.loginUsers?.includes(v.value.reciever)){
              this.sockets.sendMessege(credentials);
              
              console.log('send messege without notification');
            }else{

              let notific = {
                author: this.user.username, 
                reciever: this.chat.another, 
                chatid: this.chat.chatid, 
                msgid: v.value._id
              }

              this.chats.addNotification(notific).subscribe((n:any)=>{
                console.log(n, 'add NOtify');
              });
            }

            this.sockets.$messege.next({...v.value, msgid: v.value._id});

            // let msg ={
            //   author: this.user.username,
            //   msg: messege,
            //   chatid: this.chat.chatid
            // }
            console.log(credentials);
  
            this.form.reset();
          });

         
  }
}
