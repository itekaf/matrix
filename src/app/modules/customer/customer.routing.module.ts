import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerCardBionicComponent } from './customer-card-bionic/customer-card-bionic.component';

const routes: Routes = [
  {
    path: 'customer/bionic',
    component: CustomerCardBionicComponent
  },
  {
    path: 'customers',
    component: CustomerListComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {}
