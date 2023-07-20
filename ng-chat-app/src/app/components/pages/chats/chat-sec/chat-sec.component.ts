import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { LayoutService } from 'src/app/services/layout.service';
import { SocketsService } from 'src/app/services/sockets.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-sec',
  templateUrl: './chat-sec.component.html',
  styleUrls: ['./chat-sec.component.scss']
})
export class ChatSecComponent implements OnInit {
  chatsec: Array<any> = []
  loginUsers: Array<any>=[];
  notifys: any = {};
  activeChat: String = '';

  constructor(
    private users: UserService,
    private router: Router,
    private chats: ChatService,
    private sockets: SocketsService,
    private ngZone: NgZone,
    private layouts: LayoutService
    ){}

  ngOnInit(): void {
    
    this.getChat();
    this.getNotify();

    let logins = sessionStorage.getItem('logins');
    if(logins){
      this.loginUsers = JSON.parse(logins);
    }
  

    this.chats.$Notifications.subscribe((n:Array<any>)=>{
        this.ngZone.run(()=>{
          if(n.length>0){
            n.forEach((el:any) => {  
              this.notifys[el.chatid] =el;
            })
          }
          else{
            this.notifys ={};
          }
          
          console.log('subs', n, this.notifys);
        });
    });
    
    this.chats.$newchat.subscribe((v:any)=>{

      this.users.fetchUsers().subscribe((users:any)=>{
        let blogers = users.value;

            let bloger = blogers.filter((b: any) => b.username == v.author)[0];
    
        let newchat = {
          another: v.author,
          chatid: v.chatid,
          name: bloger.name,
          profilepic: bloger.profilepic
        }

        this.ngZone.run(()=>{
          this.chatsec.unshift(newchat);
        });
        this.getNotify();
          
      });
    });

    this.sockets.$LoginUsers.subscribe((v:Array<any>)=>{
      sessionStorage.setItem('logins', JSON.stringify(v));
      this.ngZone.run(()=>{
        this.loginUsers = v;
        
        console.log('logins', this.loginUsers);
      });  
     });

     

    // setTimeout(() => {
    //   this.getChat();
    //   this.getLoginUsers();
    // }, 200);
  }

  getNotify(){
      this.chats.fetchNotifications()
      .subscribe((n:any)=>{
        this.chats.$Notifications.next(n.value);
      });
  }

  getChat(){
    // this.users.$User.subscribe((v:any)=>{
    this.chats.fetchChat().subscribe((v:any) =>{
    
      let chatsec = v.value;

      this.users.fetchUsers().subscribe((v:any)=>{
        let blogers = v.value;

        if(chatsec){
          chatsec = chatsec.map((e:any) =>{
            let bloger = blogers.filter((b: any) => b.username == e.another)[0];
            return {
              ...e,
              profilepic: bloger.profilepic,
              name: bloger.name
            };
          })
        }
          this.chatsec = chatsec;
      });
    });
    // });
  }

  getLoginUsers(){
    
  }

  showChat(chat: any){
    if(this.layouts.tab){
      this.layouts.$openChat.next(true);
    }
    
    
    console.log(chat);
    this.chats.$Chat.next(chat);
    this.chats.fetchMesseges(chat.chatid).subscribe((v:any) =>{
      // console.log(v);    
      this.chats.$Messeges.next(v.value);
      this.activeChat = chat.chatid;

      let notify = this.notifys[chat.chatid];
      if(notify){
        this.chats.clearNotifications(notify._id).subscribe((n:any)=>{
          this.getNotify();
        });
      }
      

    });

    console.log(this.activeChat);
    // this.router.navigate([chat.another], {relativeTo: this.activatedRoute});
  }
}
