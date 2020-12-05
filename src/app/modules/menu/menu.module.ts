import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuListComponent } from './menu-list/menu-list.component';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MenuListComponent],
  imports: [
    CommonModule, SharedModule, RouterModule
  ],
  exports: [
    MenuListComponent
  ]
})
export class MenuModule { }
