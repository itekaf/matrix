import * as xlsx from 'xlsx';
import { Injectable } from '@angular/core';
import { XlsxService } from './xlsx.service';

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

  public readFileFromData(data: Buffer) {
    const workbook = xlsx.read(data);
    console.log(workbook);
  }
}
