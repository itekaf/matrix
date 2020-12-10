import { ElectronService } from 'app/core/services';
import { XlsxService } from 'app/core/services/xlsx/xlsx.service';
import { ToastrService } from 'ngx-toastr';
import * as xlsx from 'xlsx';

import { XlsxVsePoleznoService } from 'app/core/services/xlsx/xlsx-vse-polezno.service';
import { Component, OnInit } from '@angular/core';
import { ItemModel } from 'app/core/models/item.model';
import { ItemDBService } from 'app/core/services/lowdb/item.lowdb.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguagesLongEnum, LanguagesShortEnum } from 'app/core/enum/languagesShortEnum';
import { SettingsDBService, IAppSettings } from 'app/core/services/lowdb/settings.lowdb.service';
import { ElectronDialogService } from 'app/core/services/electron/electron.dialog.service';

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
    this.settingsFromGroup = new FormGroup({
      languages: this.languagesControl,
    });
    this.languagesControl.valueChanges.subscribe((value) => {
      const correctSetting: IAppSettings = {
        ...defaultSettings,
        language: value
      };
      this.settingDBService.setSettings(correctSetting);
      this.translateService.use(value);
    });
  }

  public importDataFromSite() {
    this.isLoading = true;
    this.electronDialogService.openDialog((filePath: string) => {
      try {
        const fileData = this.electronService.fs.readFile(filePath, (error, file) => {
          const items: ItemModel[] = this.xlsxVsePoleznoService.readFileFromData(file);
          items.forEach((value) => {
            this.itemDBService.changeSingleByBarcodeFromWebsite(value);
          });
          this.toastr.info('Import is successful')
        });
      } catch (e) {
        this.toastr.error(e);
      } finally {
        this.isLoading = false;
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

      const currentData = this.itemDBService.getMain();
      const correctData = this.xlsxVsePoleznoService.convertData(currentData);
      const worksheet = xlsx.utils.json_to_sheet(correctData);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, '1C');
      xlsx.writeFile(workbook, dialogSync);
    } catch (e) {
      this.toastr.error(e);
    }

  }
}
