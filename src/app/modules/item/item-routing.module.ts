import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ItemCardComponent } from './item-card/item-card.component';
import { ItemListComponent } from './item-list/item-list.component';


const routes: Routes = [
  {
    path: 'items',
    redirectTo: 'item-list',
    pathMatch: 'full'
  },
  {
    path: 'item-card',
    component: ItemCardComponent
  },
  {
    path: 'item-list',
    component: ItemListComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule {}
