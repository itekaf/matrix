

import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ElectronDialogService {
  constructor(
    private electronService: ElectronService,
    private toastr: ToastrService,
  ) {}

  public openDialog(cb: Function) {
    this.electronService.remote.dialog.showOpenDialog({
      filters: [
        { name: 'Excel', extensions: ['xlsx', 'xls' ] },
        { name: 'All Files', extensions: ['*'] }
      ]
    }).then(result => {
      const folders: string[] = result.filePaths;
      if(!!folders && folders[0]) {
        cb(folders[0]);
      } else {
        this.toastr.error('File not found');
      }
    }).catch(err => {
      this.toastr.error('Something was wrong', err);
    });
  }
}
