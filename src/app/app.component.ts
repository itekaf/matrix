import { Component, OnInit } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { ItemDBService } from 'app/core/services/lowdb/item.lowdb.service';
import { CustomerDBService } from 'app/core/services/lowdb/customer.lowdb.service';
import { LanguagesShortEnum } from 'app/core/enum/languagesShortEnum';
import { IAppSettings, SettingsDBService } from 'app/core/services/lowdb/settings.lowdb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isMenuOpen: boolean = false;
  constructor(
    public electronService: ElectronService,
    private dbItems: ItemDBService,
    private dbCustomers: CustomerDBService,
    private translateService: TranslateService,
    private dbSettings: SettingsDBService,
  ) {

    console.log('AppConfig', AppConfig);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  public ngOnInit(): void {
    this.initDatabase();
    this.initTranslate();
  }

  private initDatabase() {
    this.dbItems.connect();
    this.dbSettings.connect();
    this.dbCustomers.connect();
  }

  private initTranslate(): void {
    this.translateService.setDefaultLang(LanguagesShortEnum.en);
    this.translateService.addLangs([LanguagesShortEnum.en, LanguagesShortEnum.ru]);

    const defaultSettings: IAppSettings = this.dbSettings.getSettings();
    this.translateService.use(defaultSettings.language);
  }
}
