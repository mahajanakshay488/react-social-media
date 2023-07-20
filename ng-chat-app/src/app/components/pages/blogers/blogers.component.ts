import { Component } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-blogers',
  templateUrl: './blogers.component.html',
  styleUrls: ['./blogers.component.scss']
})
export class BlogersComponent {
  constructor(
   public layouts: LayoutService
  ){}
}
