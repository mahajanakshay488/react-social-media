import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomThemeModule } from './custom-theme/custom-theme.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/forms/login/login.component';
import { SignupComponent } from './components/forms/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { MessengerComponent } from './components/pages/chats/messenger/messenger.component';
import { ChatBoxComponent } from './components/pages/chats/chat-box/chat-box.component';
import { ChatSecComponent } from './components/pages/chats/chat-sec/chat-sec.component';
import { MsgComponent } from './components/pages/chats/msg/msg.component';
import { MsgInputComponent } from './components/pages/chats/msg-input/msg-input.component';
import { ChatingComponent } from './components/pages/chats/chating/chating.component';
import { BlogersComponent } from './components/pages/blogers/blogers.component';
import { ListComponent } from './components/pages/blogers/list/list.component';
import { SearchComponent } from './components/pages/blogers/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    MessengerComponent,
    ChatBoxComponent,
    ChatSecComponent,
    MsgComponent,
    MsgInputComponent,
    ChatingComponent,
    BlogersComponent,
    ListComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomThemeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
