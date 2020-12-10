import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerCardBionicComponent } from './customer-card-bionic/customer-card-bionic.component';
import { SharedModule } from 'app/shared/shared.module';
import { CustomerRoutingModule } from 'app/modules/customer/customer.routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CustomerListComponent, CustomerCardBionicComponent],
  imports: [
    CommonModule, SharedModule, CustomerRoutingModule, RouterModule
  ],
  exports: [
    CustomerCardBionicComponent,
    CustomerListComponent,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
