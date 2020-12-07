import { ElectronService } from 'app/core/services';
import { XlsxService } from 'app/core/services/xlsx/xlsx.service';
import { ToastrService } from 'ngx-toastr';

import { XlsxVsePoleznoService } from 'app/core/services/xlsx/xlsx-vse-polezno.service';
import { Component, OnInit } from '@angular/core';
import { ItemModel } from 'app/core/models/item.model';
import { ItemDBService } from 'app/core/services/lowdb/item.lowdb.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguagesLongEnum, LanguagesShortEnum } from 'app/core/enum/languagesShortEnum';

@Component({
  selector: 'app-settings-item',
  templateUrl: './settings-item.component.html',
  styleUrls: ['./settings-item.component.scss']
})
export class SettingsItemComponent implements OnInit {
  public settingsFromGroup: FormGroup;
  public languagesOptions: Object[] = [
    {
      name: LanguagesLongEnum.English,
      short: LanguagesShortEnum.en
    },{
      name: LanguagesLongEnum.Russian,
      short: LanguagesShortEnum.ru
    }
  ];
  public languagesControl: FormControl = new FormControl(LanguagesShortEnum.en);

  constructor(
    private electronService: ElectronService,
    private xlsxService: XlsxService,
    private xlsxVsePoleznoService: XlsxVsePoleznoService,
    private toastr: ToastrService,
    private itemDBService: ItemDBService,
    private fb: FormBuilder,
    private translateService: TranslateService,
  ) {

  }

  ngOnInit() {
    this.settingsFromGroup = new FormGroup({
      languages: this.languagesControl,
    });
    this.languagesControl.valueChanges.subscribe((value) =>{
      console.log(value);
      this.translateService.use(value);
    });
  }

  public importDataFromSite() {
    this.electronService.remote.dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        { name: 'Excel', extensions: ['xlsx', 'xls' ] },
        { name: 'All Files', extensions: ['*'] }
      ]
    }).then(result => {
        const folders: string[] = result.filePaths;
        if(folders && folders[0]) {
          this.readFile(folders[0]);
        } else {
          throw new Error('File not found');
        }
      }).catch(err => {
        this.toastr.success('Something was wrong', err);
    });
  }

  readFile(filePath: string): void {
    const fileData = this.electronService.fs.readFile(filePath, (error, file) => {
      this.itemDBService.resetMain();
      const items: ItemModel[] = this.xlsxVsePoleznoService.readFileFromData(file);
      items.forEach((value) => {
        this.itemDBService.set(value);
      })
    });
  }

  public exportDataTo1C() {

  }
}
