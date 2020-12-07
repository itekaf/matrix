import * as xlsx from 'xlsx';
import { XlsxService } from './xlsx.service';

import { ItemModel } from './../../models/item.model';
import { Injectable } from '@angular/core';
import { JsonConvert } from 'json2typescript';

@Injectable({
  providedIn: 'root'
})
export class XlsxVsePoleznoService {

  private mainSheet: string = 'Products';

  constructor(
    private xlsxService: XlsxService,
  ) {}

  public exportData() {

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
