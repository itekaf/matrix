import * as xlsx from 'xlsx';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class XlsxService {

  constructor() {}

  public exportData() {

  }

  public readFileFromData(data: Buffer) {
    const workbook = xlsx.read(data);
    console.log(workbook);
  }
}

