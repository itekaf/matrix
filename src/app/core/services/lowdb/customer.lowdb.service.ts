import { Injectable } from '@angular/core';
import { LowdbService } from './lowdb.service';
import { IDatabaseConnect, IDatabaseModel, ITableDatabase } from '../../interfaces/database.iterface';
import { CustomerModel } from '../../models/customer.model';
import { ItemModel } from 'app/core/models/item.model';

const defaultObject: ITableDatabase = {
  main: [],
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

  get() {
    return this.connect().get('main').value();
  }
  set(item: IDatabaseModel) {
    return this.connect().get('main').push(item).write();
  }
  remove(id: number) {
    return this.connect().get('main').remove({ id }).write()
  }
}
