import { Injectable } from '@angular/core';
import { LowdbService } from './lowdb.service';
import { IDatabaseConnect, IDatabaseModel, ITableDatabase } from '../../interfaces/database.iterface';
import { ItemModel } from '../../models/item.model';
import Item = Electron.Item;
import { core } from '@angular/compiler';
import { JsonProperty } from 'json2typescript';

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

  getMain() {
    return this.connect().get('main').value();
  }

  getSettings() {
    return this.connect().get('settings').value();
  }

  setMain(item: ItemModel) {
    const currentItems: ItemModel[] = this.getMain();
    const isExist: ItemModel = currentItems.find((x) => x.barcode === item.barcode);
    console.log(isExist);
    if (!!isExist) {
      return this.changeMainSingle(item);
    } else {
      return this.connect().get('main').push(item).write();
    }
  }

  changeMainSingle(item: ItemModel) {
    const allOfMain: ItemModel[] = this.getMain();
    const correctMain = allOfMain.reduce((accum: IDatabaseModel[], value: ItemModel) => {
      if (value.barcode === item.barcode) {
        accum.push(item);
      } else  {
        accum.push(value);
      }
      return accum;
    }, []);
    return this.connect().set('main', correctMain).write();
  }

  changeSingleByBarcodeFromWebsite(item: ItemModel) {
    const items: ItemModel[] = this.getMain();
    const itemIndex: number = items.findIndex((x) => x.barcode === item.barcode);
    if (itemIndex === -1 ) {
      items.push(item);
    } else {
      const correctItem: ItemModel = new ItemModel();
      correctItem.id = item.id;
      correctItem.name = items[itemIndex].name;
      correctItem.categories = item.categories;
      correctItem.sku = item.sku;
      correctItem.article = items[itemIndex].article;
      correctItem.price = item.price;
      correctItem.weight = item.weight;
      correctItem.weightUnit = item.weightUnit;
      correctItem.length = item.length;
      correctItem.width = item.width;
      correctItem.height = item.height;
      correctItem.lengthUnit = item.lengthUnit;
      correctItem.description = item.description;
      correctItem.metaTitle = item.metaTitle;
      correctItem.metaDescription = item.metaDescription;
      correctItem.customer = items[itemIndex].customer;
      correctItem.barcode = item.barcode;
      correctItem.count = item.count;
      correctItem.stock = item.stock;
      correctItem.priceWithoutNDS = items[itemIndex].priceWithoutNDS;
      correctItem.ndsCount = items[itemIndex].ndsCount;

      correctItem.priceWithNDS = item.priceWithNDS;
      correctItem.priceView = item.priceView;
      correctItem.priceRetailWithNDS = item.priceRetailWithNDS;
      correctItem.priceView2 = item.priceView2;
      correctItem.priceRetailWithNDSFull = item.priceRetailWithNDSFull;
      correctItem.units = item.units;
      correctItem.country = items[itemIndex].country;
      correctItem.brand = item[itemIndex].brand;

      items[itemIndex] = correctItem;
    }
    return this.connect().set('main', items).write();
  }

  changeSingleByBarcodeFromCustomer(item: ItemModel) {
    console.log('change');
    const items: ItemModel[] = this.getMain();
    const itemIndex: number = items.findIndex((x) => x.barcode === item.barcode);
    if (itemIndex === -1 ) {
      items.push(item);
    } else {
      const correctItem: ItemModel = new ItemModel();
      correctItem.id = items[itemIndex].id;
      correctItem.name = item.name;
      correctItem.categories = items[itemIndex].categories;
      correctItem.sku = items[itemIndex].sku;
      correctItem.article = items[itemIndex].article;
      correctItem.price = items[itemIndex].price;
      correctItem.weight = items[itemIndex].weight;
      correctItem.weightUnit = items[itemIndex].weightUnit;
      correctItem.length = items[itemIndex].length;
      correctItem.width = items[itemIndex].width;
      correctItem.height = items[itemIndex].height;
      correctItem.lengthUnit = items[itemIndex].lengthUnit;
      correctItem.description = items[itemIndex].description;
      correctItem.metaTitle = items[itemIndex].metaTitle;
      correctItem.metaDescription = items[itemIndex].metaDescription;
      correctItem.customer = item.customer;
      correctItem.barcode = items[itemIndex].barcode;
      correctItem.count = items[itemIndex].count;
      correctItem.stock = items[itemIndex].stock;
      correctItem.priceWithoutNDS = item.priceWithoutNDS;
      correctItem.ndsCount = item.ndsCount;
      correctItem.priceWithNDS = item.priceWithNDS;
      correctItem.priceView = items[itemIndex].priceView;
      correctItem.priceRetailWithNDS = items[itemIndex].priceRetailWithNDS;
      correctItem.priceView2 = items[itemIndex].priceView2;
      correctItem.priceRetailWithNDSFull = items[itemIndex].priceRetailWithNDSFull;
      correctItem.units = items[itemIndex].units;
      correctItem.country = item.country;
      correctItem.brand = item.brand;

      items[itemIndex] = correctItem;
    }

    return this.connect().set('main', items).write();
  }

  setSettings(item: Object, prop) {
    return this.connect().set('settings', item).write();
  }

  resetMain() {
    return this.connect().set('main', []).write();
  }

  removeSettings(id: number) {
    return this.connect().get('setting').remove({ id }).write()
  }

  removeMain(id: number) {
    return this.connect().get('main').remove({ id }).write()
  }
}
