import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import { SettingsModule } from 'app/modules/settings/settings.module';
import { SettingsItemComponent } from 'app/modules/settings/settings-item/settings-item.component';

// @ts-ignore
// @ts-ignore
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'items',
    loadChildren: () => import('./modules/item/item.module').then((m) => m.ItemModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./modules/settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
