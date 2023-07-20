import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Timestamp, timeout } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { SocketsService } from 'src/app/services/sockets.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chating',
  templateUrl: './chating.component.html',
  styleUrls: ['./chating.component.scss']
})

export class ChatingComponent {
  messeges: Array<any> =[];
  anotherpic:String = '';
  anothername: String='';
  chatid: String = '';
  username: String = '';
  userpic: String = '';
  existMsg: any={msgid: ''};
  modified: boolean = false;
  typingU: any=null;

  @ViewChild('commentDetailWrapper', { static: false }) commentDetailWrapper: any;

  constructor( private chats: ChatService,
    private users: UserService,
    private sockets: SocketsService,
    private ngZone: NgZone
    ){
  }

  ngOnInit(): void {

    setTimeout(() => {
      this.getPictures(); 
    }, 1000);
     
 
      this.getMsg();
    
      this.getMesseges(); 

      // this.getTyping();

   }

  //  getTyping(){
  //   this.chats.$typing.subscribe((v:any)=>{
  //     this.ngZone.run(()=>{
  //       this.typingU = v;
  //       setTimeout(() => {
  //         this.typingU = null;
  //       }, 2000);
        
  //     });
  //     console.log(this.typingU, this.chatid);
  //   });
  //  }

  getPictures(){
    this.chats.$Chat.subscribe((v:any) =>{
      
        this.anotherpic = v.profilepic;
        this.anothername = v.another;
        this.chatid = v.chatid;
      
    });
  
     this.users.user.subscribe((v:any)=>{
      
        this.userpic = v.profilepic;
        this.username = v.username;
        console.log(this.username,v);
      
     });
  }

   getMesseges(){
    this.chats.$Messeges.subscribe((msgs: any)=>{
      // console.log(msgs);
      this.messeges = msgs;
      this.modified = true;
      });
   }

   getMsg(){
    this.sockets.$messege.subscribe((v:any) =>{
      
      let msg = {
        author: v.author,
        msg: v.msg,
        chatid: v.chatid
      }
      console.log(this.chatid, v);

      if(!(this.existMsg.msgid == v.msgid)){

        if(this.chatid == v.chatid){

          this.ngZone.run(()=>{
            this.messeges = [...this.messeges, v];
            this.existMsg = v;
            console.log('msgsubs', this.messeges);
            this.modified = true;
           });

        }else{
          let notific = {
            author: v.author, 
            reciever: v.reciever, 
            chatid: v.chatid, 
            msgid: v.msgid
          }

          console.log(notific, v);

          this.chats.addNotification(notific).subscribe((n:any)=>{
            console.log(n, 'add NOtify');
            this.chats.fetchNotifications().subscribe((noti:any) =>{
              this.chats.$Notifications.next(noti.value);
              console.log('fetchedNoOty', noti);
            });
          });
        }
      }
        
    
    });
   }

   ngAfterViewChecked() {
    if (this.modified) {
      this.scrollToBottom();
      this.modified = false;
    }
  }

  scrollToBottom() {
    const el: HTMLDivElement = this.commentDetailWrapper.nativeElement;
    el.scrollTop = el.scrollHeight;
  }

  checkDate(time:any, i:number){

    if(i>0){
      let today = new Date(time).getDate();
      let yesterday = new Date(this.messeges[i-1].time).getDate();
      if(today !== yesterday)
      return true;
      else
      return false;
    }else{
      return true;
    }
    
  }
}
