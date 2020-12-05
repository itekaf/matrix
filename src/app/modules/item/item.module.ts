import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { ItemListComponent } from './item-list/item-list.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { ItemRoutingModule } from './item-routing.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [
    ItemCardComponent,
    ItemListComponent
  ],
  imports: [
    CommonModule, ItemRoutingModule, SharedModule
  ],
  exports: [
    ItemCardComponent,
    ItemListComponent,
    ItemRoutingModule
  ]
})
export class ItemModule { }
