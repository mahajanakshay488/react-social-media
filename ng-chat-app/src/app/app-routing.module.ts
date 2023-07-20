import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/forms/login/login.component';
import { SignupComponent } from './components/forms/signup/signup.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { MessengerComponent } from './components/pages/chats/messenger/messenger.component';
import { ChatBoxComponent } from './components/pages/chats/chat-box/chat-box.component';
import { BlogersComponent } from './components/pages/blogers/blogers.component';


const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo: 'login' },
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'user-profile', component: ProfileComponent},
  {path:'messenger', component: MessengerComponent}, 
  {path: 'blogers', component: BlogersComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
