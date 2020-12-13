import { Injectable } from '@angular/core';
import { LowdbService } from './lowdb.service';
import { IDatabaseConnect, IDatabaseModel, ITableDatabase } from '../../interfaces/database.iterface';
import { ItemModel } from '../../models/item.model';
import { LanguagesShortEnum } from 'app/core/enum/languagesShort.enum';

export interface IAppSettings {
    articlePrefix: string;
    articleNumber: number
    language: LanguagesShortEnum,
}

const defaultObject: ITableDatabase = {
  main: [],
  settings: {
      language: LanguagesShortEnum.ru,
      articlePrefix: 'BA',
      articleNumber: 100000,
  }
};

@Injectable({
  providedIn: 'root'
})
export class SettingsDBService implements IDatabaseConnect {
  database: any;
  databaseName: string = 'settings';
  defaultObject: ITableDatabase = defaultObject;

  constructor(
    private lowdbService: LowdbService,
  ) {}

  init() {
    this.connect();
  }

    updateLastArticle() {
      const currentSettings: IAppSettings = this.getSettings();
      const correctSettings: IAppSettings = {
          language: currentSettings.language,
          articlePrefix: currentSettings.articlePrefix,
          articleNumber: currentSettings.articleNumber + 1,
      };
      return this.setSettings(correctSettings);
    }
  connect() {
    return this.lowdbService.connect(this.databaseName, this.defaultObject);
  }

  getMain() {
    return this.connect().get('main').value();
  }

  getSettings<T>(): T {
    return this.connect().get('settings').value() as T;
  }

  setMain(item: IDatabaseModel | IDatabaseModel[]) {
    return this.connect().get('main').push(item).write();
  }

  setSettings(item: IAppSettings) {
    return this.connect().set('settings', item).write();
  }

  removeMain(id: number) {
    return this.connect().get('main').remove({ id }).write()
  }

  removeSettings(id: number) {
    return this.connect().get('settings').remove({ id }).write()
  }
}
