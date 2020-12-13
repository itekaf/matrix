export interface IDatabaseModel {
  id: number;
}

export interface IDatabaseConnect {
  databaseName: string;
  defaultObject: any;
  init();
  connect();
  getMain()
  setMain(items: IDatabaseModel[], prop)
  removeMain(id: number)
  getSettings()
  setSettings(item: Object, prop)
  removeSettings(id: number)
}

export interface ITableSettings {}

export interface ITableDatabase {
  main: Object[],
  settings: ITableSettings
}
