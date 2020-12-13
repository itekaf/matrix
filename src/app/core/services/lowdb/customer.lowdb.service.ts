import { Injectable } from '@angular/core';
import { LowdbService } from './lowdb.service';
import { IDatabaseConnect, IDatabaseModel, ITableDatabase } from '../../interfaces/database.iterface';
import { CustomerModel } from '../../models/customer.model';
import { customersEnum } from 'app/core/enum/customer.enum';

const defaultObject: ITableDatabase = {
  main: [
      {
          id: 1,
          name: customersEnum.bionic,
          priceCoefficient: 140,
          priceCoefficient2: 140
      }
  ],
  settings: {}
};

@Injectable({
  providedIn: 'root'
})
export class CustomerDBService implements IDatabaseConnect {
  database: any;
  databaseName: string = 'customer';
  defaultObject: ITableDatabase = defaultObject;

  constructor(
    private lowdbService: LowdbService,
  ) {}

  init() {
    this.connect();
  }
  connect() {
   return this.lowdbService.connect(this.databaseName, this.defaultObject);
  }

  getCustomer(name: customersEnum): CustomerModel {
    const allCustomers: CustomerModel[] = this.getMain();
    return allCustomers.find((x: CustomerModel) => x.name === name);
  }

  setCustomer(item: CustomerModel) {
    const allCustomers: CustomerModel[] = this.getMain();
    const customerIndex: number = allCustomers.findIndex((x) => x.name === item.name);
    if (customerIndex === -1) {
      this.setMain(item);
    } else {
      allCustomers[customerIndex] = item;
      this.setMainAll(allCustomers);
    }
  }

  getMain() {
    return this.connect().get('main').value();
  }
  getSettings() {
  }

  setMainAll(items: IDatabaseModel[]) {
    return this.connect().set('main', items).write();
  }

  setMain(item: IDatabaseModel | IDatabaseModel[]) {
    return this.connect().get('main').push(item).write();
  }

  changeMainSingle(item: IDatabaseModel) {

  }

  setSettings(item: Object, prop) {
    return this.connect().set('settings', item).write();
  }

  removeMain(id: number) {
    return this.connect().get('main').remove({ id }).write()
  }
  removeSettings(id: number) {
  }
}
