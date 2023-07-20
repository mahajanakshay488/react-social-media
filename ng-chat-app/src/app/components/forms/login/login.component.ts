import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { SocketsService } from 'src/app/services/sockets.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  @ViewChild('form') form!: NgForm;

  hide= true;

  constructor(
    private users: UserService, 
    private router: Router,
    private sockets: SocketsService
  ){
    
  }

  ngOnInit(): void { 
  }

  login(){
    let user = this.form.form.value;
    console.log(user);
    
    this.users.loginUser(user).subscribe((v:any) =>{
      console.log(v);
      this.sockets.addUser(v.value.username);
      this.users.$isLogedin.next(true);
      this.users.$User.next(v.value);
      this.users.getProfile();
      this.router.navigate(['/messenger']);
    });
  }
}
