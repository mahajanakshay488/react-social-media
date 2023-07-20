import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import {MatSidenavModule} from '@angular/material/sidenav';
import {LayoutModule} from '@angular/cdk/layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import{ MatInputModule} from'@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import { DialogModule } from '@angular/cdk/dialog';

const material = [
  MatToolbarModule, 
  MatButtonModule, 
  MatIconModule,
  MatSidenavModule,
  LayoutModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatListModule,
  MatBadgeModule,
  MatMenuModule,
  DialogModule
]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    material,
  ],
  exports: [ 
    material
  ]
})
export class CustomThemeModule { }
