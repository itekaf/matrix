import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { LoadingDataComponent } from './components/loading-data/loading-data.component';
import { BaseComponentComponent } from './components/base-component/base-component.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const sharedModules = [
  MatListModule,
  TranslateModule,
  FormsModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatOptionModule,
  MatSelectModule,
  FormsModule,
  ReactiveFormsModule,
  MatCardModule,
  MatProgressBarModule,
];

@NgModule({
  declarations: [
    PageNotFoundComponent,
    WebviewDirective,
    LoadingDataComponent,
    BaseComponentComponent
  ],
  imports: [
    ...sharedModules,
    CommonModule
  ],
  exports: [
    ...sharedModules,
    LoadingDataComponent
  ]
})
export class SharedModule {}
