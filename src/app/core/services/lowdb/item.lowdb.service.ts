import { Injectable } from '@angular/core';
import { LowdbService } from './lowdb.service';
import { IDatabaseConnect, IDatabaseModel, ITableDatabase } from '../../interfaces/database.iterface';
import { ItemModel } from '../../models/item.model';

const defaultObject: ITableDatabase = {
  main: [],
  settings: {}
};

@Injectable({
  providedIn: 'root'
})
export class ItemDBService implements IDatabaseConnect {
  database: any;
  databaseName: string = 'items';
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

  resetMain() {
    return this.connect().set('main', []).write();
  }

  remove(id: number) {
    return this.connect().get('main').remove({ id }).write()
  }
}
