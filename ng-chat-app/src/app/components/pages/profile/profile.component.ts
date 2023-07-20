import { Component, NgZone, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { LayoutService } from 'src/app/services/layout.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(
    private users: UserService,
    private chats: ChatService,
    private ngzone: NgZone,
    public layouts: LayoutService 
  ){}

  ngOnInit(): void {
    // this.getUser();
    this.subsUser();
    setTimeout(() => {
      this.subsUser();
    }, 1000);
  }

  subsUser(){
    this.users.user.subscribe(ob=>{
      this.user = ob;
      console.log(ob, 'subs');
    });
    console.log('init');
  }

  getUser(){
    this.users.$User.subscribe((v:any) =>{
      this.ngzone.run(()=>{
        this.user = v;
      });
      
      console.log(this.user, v);
    });
  }

  selectedFile(event: any){

    let imgfile:File = event.target.files[0];
    let formData:FormData = new FormData();
    formData.append('imgfile', imgfile);

    console.log(imgfile);

    this.users.uploadPic(formData).then((v:any)=>{
      this.users.$User.next(v.data.value);
      this.users.getProfile();
      console.log(v.data);
    })
    .catch(err =>console.log('uploadpic', err));

  }
}
