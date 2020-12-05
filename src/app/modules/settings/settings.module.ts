import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsItemComponent } from './settings-item/settings-item.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [SettingsItemComponent],
  imports: [
    CommonModule, SettingsRoutingModule, SharedModule
  ],
  exports: [
    SettingsRoutingModule,
    SettingsItemComponent
  ]
})
export class SettingsModule { }
