import { ElectronService } from 'app/core/services';
import { XlsxService } from 'app/core/services/xlsx/xlsx.service';
import { ToastrService } from 'ngx-toastr';
import * as xlsx from 'xlsx';

import { XlsxVsePoleznoService } from 'app/core/services/xlsx/xlsx-vse-polezno.service';
import { Component, OnInit } from '@angular/core';
import { ItemModel } from 'app/core/models/item.model';
import { ItemDBService } from 'app/core/services/lowdb/item.lowdb.service';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguagesLongEnum, LanguagesShortEnum } from 'app/core/enum/languagesShort.enum';
import { SettingsDBService, IAppSettings } from 'app/core/services/lowdb/settings.lowdb.service';
import { ElectronDialogService } from 'app/core/services/electron/electron.dialog.service';
const XlsxPopulate = require('xlsx-populate');

interface ILanguageOption {
  name: LanguagesLongEnum,
  short: LanguagesShortEnum
}
@Component({
  selector: 'app-settings-item',
  templateUrl: './settings-item.component.html',
  styleUrls: ['./settings-item.component.scss']
})
export class SettingsItemComponent implements OnInit {
  public isLoading: boolean = false;
  public settingsFromGroup: FormGroup;
  public languagesOptions: ILanguageOption[] = [
    {
      name: LanguagesLongEnum.English,
      short: LanguagesShortEnum.en
    },{
      name: LanguagesLongEnum.Russian,
      short: LanguagesShortEnum.ru
    }
  ];
    public languagesControl: FormControl = new FormControl();
    public articleNumberControl: FormControl = new FormControl();
    public articlePrefixControl: FormControl = new FormControl();

    private startRow: number = 2;
    private sheetName: string = 'Products';


    private collName: string = 'B';
    private collCategories: string = 'C';
    private collBarcode: string = 'F';
    private collCount: string = 'K';
    private collArticle: string = 'L';
    private collCustomer: string = 'M';
    private collPrice: string = 'P';
    private collWeight: string = 'U';
    private collWeightUnit: string = 'V';
    private collLength: string = 'W';
    private collWidth: string = 'X';
    private collHeight: string = 'Y';
    private collLengthUnit: string = 'Z';


    constructor(
        private electronService: ElectronService,
        private xlsxService: XlsxService,
        private xlsxVsePoleznoService: XlsxVsePoleznoService,
        private toastr: ToastrService,
        private itemDBService: ItemDBService,
        private fb: FormBuilder,
        private translateService: TranslateService,
        private settingDBService: SettingsDBService,
        private electronDialogService: ElectronDialogService,
    ) {

    }

  ngOnInit() {
    const defaultSettings: IAppSettings = this.settingDBService.getSettings();
    this.languagesControl.setValue(defaultSettings.language);
    this.articleNumberControl.setValue(defaultSettings.articleNumber);
    this.articlePrefixControl.setValue(defaultSettings.articlePrefix);

    this.settingsFromGroup = new FormGroup({
        articleNumber: this.articleNumberControl,
        articlePrefix: this.articlePrefixControl,
        languages: this.languagesControl,
    });

  }

  public saveSettingsAction() {
      const correctSetting: IAppSettings = {
          articlePrefix: this.articlePrefixControl.value,
          articleNumber: this.articleNumberControl.value,
          language: this.languagesControl.value
      };
      this.settingDBService.setSettings(correctSetting);
      this.translateService.use(this.languagesControl.value);
  }

  public importDataFromSite() {
    this.isLoading = true;
    this.electronDialogService.openDialog((filePath: string) => {
      try {

          XlsxPopulate.fromFileAsync(filePath).then((wb) => {
              try {
                  const items: ItemModel[] = [];
                  const sheet = wb.sheet(this.sheetName);
                  const rowsEnd = sheet._rows.length;

                  for (let index = this.startRow; index < rowsEnd; index++) {
                      if (typeof sheet.cell(this.collBarcode + index).value() === 'string') {
                          continue;
                      }
                      const item = new ItemModel();

                      console.log(index);
                      item.name = sheet.cell(this.collName + index).value();
                      item.barcode = sheet.cell(this.collBarcode + index).value();
                      item.categories = sheet.cell(this.collCategories + index).value();
                      item.count = sheet.cell(this.collCount + index).value();
                      item.article = sheet.cell(this.collArticle + index).value().toString();
                      item.customer = sheet.cell(this.collCustomer + index).value();
                      item.price = sheet.cell(this.collPrice + index).value();
                      item.weight = sheet.cell(this.collWeight + index).value();
                      item.weightUnit = sheet.cell(this.collWeightUnit + index).value();
                      item.length = sheet.cell(this.collLength + index).value();
                      item.lengthUnit = sheet.cell(this.collLengthUnit + index).value();
                      item.width = sheet.cell(this.collWidth + index).value();
                      item.height = sheet.cell(this.collHeight + index).value();
                      items.push(item);
                  }
                  items.forEach((value) => {
                      this.itemDBService.changeSingleByBarcodeFromWebsite(value);
                  });
                  this.isLoading = false;
                  this.toastr.info('Import is successful')
              } catch (e) {
                  this.toastr.error(e);
              }
        });
      } catch (e) {
        this.toastr.error(e);
      }
    })
  }

  public exportDataTo1C() {
    try {
      const dialogSync = this.electronService.remote.dialog.showSaveDialogSync({
        title: '1C',
        filters: [
          { name: 'Excel', extensions: ['xlsx', 'xls' ] },
          { name: 'All Files', extensions: ['*'] }
        ]
      });

        const cellStock: string = 'A';
        const cellCategories: string = 'B';
        const cellBarcode :string = 'C';
        const cellArticle: string = 'D';
        const cellName: string = 'E';
        const cellCount: string = 'F';
        const cellPriceWithoutNds: string = 'G';
        const cellNdsCount: string = 'H';
        const cellPriceWithNds: string = 'I';
        const cellPriceView: string = 'J';
        const cellRetailPrice: string = 'K';
        const cellPriceView2: string = 'L';
        const cellRetailPriceFull: string = 'M';
        const cellPriceView3: string = 'N';
        const cellUnit: string = 'O';
        const cellCountry: string = 'P';
        const cellCustomer: string = 'Q';

        XlsxPopulate.fromBlankAsync()
            .then(workbook => {
                // Modify the workbook.

                const sheet = workbook.addSheet("Products");
                sheet.cell(`${cellStock}1`).value("Склад");
                sheet.cell(`${cellCategories}1`).value("Категория");
                sheet.cell(`${cellBarcode}1`).value("Штрихкод");
                sheet.cell(`${cellArticle}1`).value("Артикул");
                sheet.cell(`${cellName}1`).value("Наименование");
                sheet.cell(`${cellCount}1`).value("Количество");
                sheet.cell(`${cellPriceWithoutNds}1`).value("Цена без НДС");
                sheet.cell(`${cellNdsCount}1`).value("Ставка НДС");
                sheet.cell(`${cellPriceWithNds}1`).value("Учетная цена с НДС");
                sheet.cell(`${cellPriceView}1`).value("Вид цен");
                sheet.cell(`${cellRetailPrice}1`).value("Розничная цена 2 с НДС");
                sheet.cell(`${cellPriceView2}1`).value("Вид цен 2");
                sheet.cell(`${cellRetailPriceFull}1`).value("Розничная  фул-прайс с НДС");
                sheet.cell(`${cellPriceView3}1`).value("Вид цен 3");
                sheet.cell(`${cellUnit}1`).value("Ед");
                sheet.cell(`${cellCountry}1`).value("Страна происхождения");
                sheet.cell(`${cellCustomer}1`).value("Поставщик");

                const items: ItemModel[] = this.itemDBService.getMain();
                items.forEach((item: ItemModel, index: number) => {
                    sheet.cell(`${cellStock}${index+2}`).value(item.stock);
                    sheet.cell(`${cellCategories}${index+2}`).value(item.categories);
                    sheet.cell(`${cellBarcode}${index+2}`).value(item.barcode);
                    sheet.cell(`${cellArticle}${index+2}`).value(item.article);
                    sheet.cell(`${cellName}${index+2}`).value(item.name);
                    sheet.cell(`${cellCount}${index+2}`).value(item.count);
                    sheet.cell(`${cellPriceWithoutNds}${index+2}`).value(item.priceWithoutNDS);
                    sheet.cell(`${cellNdsCount}${index+2}`).value(item.ndsCount);
                    sheet.cell(`${cellPriceWithNds}${index+2}`).value(item.priceWithNDS);
                    sheet.cell(`${cellPriceView}${index+2}`).value(item.priceView);
                    sheet.cell(`${cellRetailPrice}${index+2}`).value(item.priceRetailWithNDS);
                    sheet.cell(`${cellPriceView2}${index+2}`).value(item.priceView2);
                    sheet.cell(`${cellRetailPriceFull}${index+2}`).value(item.priceRetailWithNDSFull);
                    sheet.cell(`${cellPriceView3}${index+2}`).value(item.priceView3);
                    sheet.cell(`${cellUnit}${index+2}`).value(item.units);
                    sheet.cell(`${cellCountry}${index+2}`).value(item.country);
                    sheet.cell(`${cellCustomer}${index+2}`).value(item.customer);
                });

                // Write to file.
                return workbook.toFileAsync(dialogSync);
            }).then(() => {
                this.toastr.info('Done');
            }).catch((e) => {
                this.toastr.error(e);
            });
        /*    const currentData = this.itemDBService.getMain();
              const correctData = this.xlsxVsePoleznoService.convertData(currentData);
              const worksheet = xlsx.utils.json_to_sheet(correctData);
              const workbook = xlsx.utils.book_new();
              xlsx.utils.book_append_sheet(workbook, worksheet, '1C');
              xlsx.writeFile(workbook, dialogSync);*/
    } catch (e) {
      this.toastr.error(e);
    }

  }
}
