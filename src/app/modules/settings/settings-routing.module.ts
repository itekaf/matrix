import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SettingsItemComponent } from './settings-item/settings-item.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'settings-item',
    pathMatch: 'full'
  },
  {
    path: 'settings-item',
    component: SettingsItemComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
