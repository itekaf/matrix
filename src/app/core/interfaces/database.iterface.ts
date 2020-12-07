export interface IDatabaseModel {
  id: number;
}

export interface IDatabaseConnect {
  databaseName: string;
  defaultObject: any;
  init();
  connect();
  get()
  set(item: IDatabaseModel, prop)
  remove(id: number)
}

export interface ITableSettings {}

export interface ITableDatabase {
  main: IDatabaseModel[],
  settings: ITableSettings
}
