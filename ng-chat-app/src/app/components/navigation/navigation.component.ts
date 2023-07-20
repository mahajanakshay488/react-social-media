import { Component, NgZone, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { LayoutService } from 'src/app/services/layout.service';
import { SocketsService } from 'src/app/services/sockets.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  user: any;
  userobj: any;
  notifications: Array<any>=[];
  chater: any;
  openChat: boolean = false;

  constructor(
    private users: UserService,
    private sockets: SocketsService,
    private router: Router,
    private chats: ChatService,
    private ngzone: NgZone,
    public layouts: LayoutService
  ){}

  ngOnInit(): void {

    this.fetchUser();

      this.users.$isLogedin.subscribe(v =>{
        this.ngzone.run(()=>{
          this.user = v;
        })
      })

      this.users.$User.subscribe(v =>{
        this.ngzone.run(()=>{
          this.userobj = v;
        })
      })

      this.chats.$Notifications.subscribe(n=>{
        this.ngzone.run(()=>{
          this.notifications = n;
        })
      });

      this.chats.$Chat.subscribe((v:any)=>{
        if(this.layouts.tab){
          this.ngzone.run(()=>{
            this.chater = v;
          });
        }
      });

     this.layouts.$openChat.subscribe((v:boolean)=>{
      this.ngzone.run(()=>{
       this.openChat = v;
      })
      
     })
      
  }

  fetchUser(){
    this.users.fetchProfile().subscribe((v:any) =>{
      if(v.notLogedin){
        this.users.$isLogedin.next(false);
        // this.user = false;
      }else{
        this.sockets.addUser(v.value.username);
        this.users.$User.next(v.value);
        this.users.$isLogedin.next(true);
        this.users.getProfile();
        this.getNotify();
        // this.user = true;
      }
      console.log(v);
    });
  }

  getNotify(){
    this.chats.fetchNotifications().subscribe((n:any)=>{
      this.chats.$Notifications.subscribe(n);
      console.log('fetch notifications', n);
    });
  }

  logout(){
      
    this.users.logoutUser().subscribe(v =>{
      this.users.$isLogedin.next(false);
      this.users.$User.next({});
      this.sockets.removeUser();
      this.router.navigate(['/login']);
    })
  }

  back(){
    if(this.layouts.tab){
      this.layouts.$openChat.next(false);
    }
    
  }

  navigate(rout:String){
    this.router.navigate([rout]);
  }
}
