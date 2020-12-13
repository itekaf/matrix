import { Component, OnInit } from '@angular/core';
import { ItemModel } from 'app/core/models/item.model';
import { ToastrService } from 'ngx-toastr';
import { ElectronDialogService } from 'app/core/services/electron/electron.dialog.service';
import { ItemDBService } from 'app/core/services/lowdb/item.lowdb.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomerDBService } from 'app/core/services/lowdb/customer.lowdb.service';
import { CustomerModel } from 'app/core/models/customer.model';
import { customersEnum } from 'app/core/enum/customer.enum';

const XlsxPopulate = require('xlsx-populate');


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
  public customerFormGroup: FormGroup;
  public priceCoefficientControl: FormControl;
  public priceCoefficient2Control: FormControl;

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
    private customerDBService: CustomerDBService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
    this.priceCoefficientControl = new FormControl();
    this.priceCoefficient2Control = new FormControl();
    this.customerFormGroup = new FormGroup({
      priceCoefficient: this.priceCoefficientControl,
      priceCoefficient2: this.priceCoefficient2Control
    });

    const item: CustomerModel = this.customerDBService.getCustomer(customersEnum.bionic);
    if (!!item) {
      this.priceCoefficientControl.setValue(item.priceCoefficient);
      this.priceCoefficient2Control.setValue(item.priceCoefficient2);
    }
  }

  public saveCustomerSettings() {
    const item: CustomerModel = new CustomerModel();
    item.name = customersEnum.bionic;
    item.priceCoefficient = this.priceCoefficientControl.value;
    item.priceCoefficient2 = this.priceCoefficient2Control.value;

    this.customerDBService.setCustomer(item);
    this.toasts.info('Successful');
  }

  public recalculateCustomer() {
      const items: ItemModel[] = this.itemsDBService.getMain();
      const correctItems: ItemModel[] = items.map((item: ItemModel) => {
            item.priceRetailWithNDS = item.priceWithNDS * this.priceCoefficientControl.value;
            item.priceRetailWithNDSFull = item.priceWithNDS * this.priceCoefficient2Control.value;
            return item;
      });
      this.itemsDBService.setMain(correctItems);
      this.toasts.info("Update successful");
  }

  public importData() {
    this.isLoading = true;
    this.electronDialogService.openDialog((filePath: string) => {
      try {
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
              item.priceWithoutNDS = sheet.cell(this.cellPriceWithoutNds + index).value();
              item.ndsCount = sheet.cell(this.collNDS + index).value();
              item.priceWithNDS = sheet.cell(this.cellPriceWithNDS + index).value();
              item.priceRetailWithNDS = Number(sheet.cell(this.cellPriceWithNDS + index).value()) * Number(this.priceCoefficientControl.value);
              item.priceRetailWithNDSFull = Number(sheet.cell(this.cellPriceWithNDS + index).value()) * Number(this.priceCoefficient2Control.value);

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

