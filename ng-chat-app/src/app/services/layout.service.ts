import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import {Subject, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  handset:boolean;
  tab:boolean;
  $openChat = new BehaviorSubject<boolean>(false);
  
  constructor(breakpointObserver: BreakpointObserver) { 
    this.handset = breakpointObserver.isMatched('(max-width: 599px)');
    this.tab = breakpointObserver.isMatched('(max-width: 839px)');
  }
}
