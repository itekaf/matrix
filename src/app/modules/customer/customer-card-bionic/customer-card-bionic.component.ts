import { Component, OnInit } from '@angular/core';
import { ItemModel } from 'app/core/models/item.model';
import { ElectronService } from 'app/core/services';
import { ToastrService } from 'ngx-toastr';
const XlsxPopulate = require('xlsx-populate');
import { JsonConvert, JsonObject, JsonProperty } from 'json2typescript';
import { ElectronDialogService } from 'app/core/services/electron/electron.dialog.service';
import { ItemDBService } from 'app/core/services/lowdb/item.lowdb.service';


class BionicModel {
  public name: string = undefined;
  public brand: string = undefined;
  public country: string = undefined;
  public barcode: string = undefined;
  public ndsCount: number = 0;
  public customer: string = undefined;
}

@Component({
  selector: 'app-customer-card-bionic',
  templateUrl: './customer-card-bionic.component.html',
  styleUrls: ['./customer-card-bionic.component.scss']
})
export class CustomerCardBionicComponent implements OnInit {
  public isLoading: boolean = false;

  private startRow: number = 3;
  private customer: string = 'Bionic';
  private sheetName: string = 'Sheet0';

  private collBarcode: string = 'A';
  private collName: string = 'B';
  private collNDS: string = 'D';
  private cellPriceWithNDS: string = 'E';
  private collCountry: string = 'F';
  private cellBrand: string = 'G';
  private cellPriceWithoutNds: string = 'C';

  constructor(
    private toasts: ToastrService,
    private electronDialogService: ElectronDialogService,
    private itemsDBService: ItemDBService,
  ) { }

  ngOnInit() {
  }
  public importData() {
    this.isLoading = true;
    this.electronDialogService.openDialog((filePath: string) => {
      try {
        console.log('ss');

        XlsxPopulate.fromFileAsync(filePath).then((wb) => {
          const items: ItemModel[] = [];
          const sheet = wb.sheet(this.sheetName);
          const rowsEnd = sheet._rows.length;

          for(let index = this.startRow; index < rowsEnd; index++) {
              if (typeof sheet.cell(this.collBarcode + index).value() === 'string') {
                continue;
              }
              const item = new ItemModel();

              item.name = sheet.cell(this.collName + index).value();
              item.brand = sheet.cell(this.cellBrand + index).value();
              item.barcode = sheet.cell(this.collBarcode + index).value();
              item.country = sheet.cell(this.collCountry + index).value();
              item.ndsCount = sheet.cell(this.collNDS + index).value();
              item.priceWithoutNDS = sheet.cell(this.cellPriceWithoutNds + index).value();
              item.priceWithNDS = sheet.cell(this.cellPriceWithNDS + index).value();
              item.customer = this.customer;
              items.push(item);
          }

          items.forEach((item: ItemModel) => {
            this.itemsDBService.changeSingleByBarcodeFromCustomer(item);
          });
          this.toasts.info('Import is successful');
          this.isLoading = false;
        })
      } catch (e) {
        this.toasts.error(e);
      } finally {

      }
    });
  }
}

