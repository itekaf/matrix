import * as xlsx from 'xlsx';
import { XlsxService } from './xlsx.service';

import { ItemModel } from './../../models/item.model';
import { Injectable } from '@angular/core';
import { JsonConvert } from 'json2typescript';
import { Item1CModel } from 'app/core/models/item-1c.model';

@Injectable({
  providedIn: 'root'
})
export class XlsxVsePoleznoService {

  private mainSheet: string = 'Products';

  constructor(
    private xlsxService: XlsxService,
  ) {}

  public convertData(data: ItemModel[]): Object[] {
    let result = [];
    data.forEach((value: ItemModel, index) => {
        const ops = new Item1CModel();
        ops.units = value.units;
        ops.name = value.name;
        const jsonConvert: JsonConvert = new JsonConvert();
        const correctObject = jsonConvert.serializeObject<Item1CModel>(value, Item1CModel);
        result.push(correctObject);
    });
    return result;
  }

  public readFileFromData(data): ItemModel[] {
    const workbook = xlsx.read(data);
    const worksheet = workbook.Sheets[this.mainSheet];
    const json = xlsx.utils.sheet_to_json(worksheet);
    let answer: ItemModel[] = [];
    json.forEach((value, index) => {
        const jsonConvert: JsonConvert = new JsonConvert();
        const user: ItemModel = jsonConvert.deserializeObject(value, ItemModel);

        answer.push(user);
    });
    return answer;
  }
}
