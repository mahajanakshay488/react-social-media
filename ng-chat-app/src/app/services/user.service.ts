import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import axios from 'axios';

const options = {
  withCredentials: true,
  origin: true,
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

const axoptions = {
  withCredentials: true,
  origin: true,
  headers: {"Content-Type": "application/json;charset=UTF-8"}
}
const uri = 'http://localhost:5000';

export interface LoginUser{
  username: String,
  password: String
}

export interface SignupUser{
  name: String,
  username: String,
  password: String
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  $isLogedin = new Subject<any>();
  $User = new Subject<any>();
  $blogers = new Subject<any>();
  user = new Observable<any>();
  

  constructor(private http: HttpClient) { }

  fetchUsers=()=>{
    return this.http.get(`${uri}/blogers`, options);
  }

  fetchProfile=()=>{
    return this.http.get(`${uri}/profile`, options);
  }

  // uploadPic=(data: any)=>{
  //   return this.http.post(`${uri}/upload/profilepic`, data, options);
  // }

  uploadPic=(data: any)=>{

    let op = {
      ...axoptions,
      headers: {
        "Content-Type": "multipart/form-data", 
      }
    }
    return axios.post(`${uri}/upload/profilepic`, data, op);
  }

  loginUser=(credentials: LoginUser)=>{
    return this.http.post(`${uri}/login`, credentials,options);
  }

  logoutUser=()=>{
    return this.http.get(`${uri}/logout`, options);
  }

  signupUser=(credentials: SignupUser)=>{
    return this.http.post(`${uri}/signup`, credentials,options);
  }

  getProfile(){
    this.fetchProfile().subscribe((v:any) =>{
      this.user =new Observable(observer=>{
        observer.next(v.value);
      });
      console.log('getProfile');
    });
  }
}
