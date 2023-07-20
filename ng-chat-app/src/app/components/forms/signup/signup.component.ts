import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SocketsService } from 'src/app/services/sockets.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
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

  signup(){
    let user = this.form.form.value;
    console.log(user);
    
    this.users.signupUser(user).subscribe((v:any) =>{
      console.log(v);
      this.sockets.addUser(v.value.username);
      this.users.$isLogedin.next(true);
      this.users.$User.next(v.value);
      this.users.getProfile();
      this.router.navigate(['/user-profile']);
    });
  }
}


