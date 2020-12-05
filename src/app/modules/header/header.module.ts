import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderItemComponent } from './header-item/header-item.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [HeaderItemComponent],
  imports: [
    CommonModule, SharedModule
  ],
  exports: [ HeaderItemComponent]
})
export class HeaderModule { }
