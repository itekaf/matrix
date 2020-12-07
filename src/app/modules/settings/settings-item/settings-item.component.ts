import { ElectronService } from 'app/core/services';
import { XlsxService } from 'app/core/services/xlsx/xlsx.service';
import { ToastrService } from 'ngx-toastr';

import { XlsxVsePoleznoService } from 'app/core/services/xlsx/xlsx-vse-polezno.service';
import { Component, OnInit } from '@angular/core';
import { ItemModel } from 'app/core/models/item.model';
import { ItemDBService } from 'app/core/services/lowdb/item.lowdb.service';

@Component({
  selector: 'app-settings-item',
  templateUrl: './settings-item.component.html',
  styleUrls: ['./settings-item.component.scss']
})
export class SettingsItemComponent implements OnInit {

  constructor(
    private electronService: ElectronService,
    private xlsxService: XlsxService,
    private xlsxVsePoleznoService: XlsxVsePoleznoService,
    private toastr: ToastrService,
    private itemDBService: ItemDBService,
  ) { }

  ngOnInit() {
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
}
