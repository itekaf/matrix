import { Component, OnInit } from '@angular/core';

interface ICustomer {
  name: string,
  logo: string,
  route: string
}

const customersList: ICustomer[] = [
  {
    name: 'Bionic.by',
    logo: './assets/customers/bionic-by.jpg',
    route: '/customer/bionic'
  }
];

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  public customersList: ICustomer[] = customersList;
  constructor() { }

  ngOnInit() {
  }

}
