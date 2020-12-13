import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ItemModel } from 'app/core/models/item.model';
import { ItemDBService } from 'app/core/services/lowdb/item.lowdb.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() inputItem: ItemModel = new ItemModel();
  @Output() public updateItemEmitter: EventEmitter<ItemModel> = new EventEmitter<ItemModel>();
  @Output() public cancelItemEmitter: EventEmitter<void> = new EventEmitter<void>();

  public itemFormGroup: FormGroup;
  public stockControl: FormControl;
  public categoriesControl: FormControl;
  public barcodeControl: FormControl;
  public articleControl: FormControl;
  public nameControl: FormControl;
  public countControl: FormControl;
  public priceWithoutNDSControl: FormControl;
  public ndsCountControl: FormControl;
  public priceWithNDSControl: FormControl;
  public priceViewControl: FormControl;
  public priceRetailWithNDSControl: FormControl;
  public priceView2Control: FormControl;
  public priceRetailWithNDSFullControl: FormControl;
  public priceView3Control: FormControl;
  public unitsControl: FormControl;
  public customerControl: FormControl;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private itemDBService: ItemDBService,
  ) {
  }

  ngOnInit(): void {
    this.buildFrom();
  }

  buildFrom() {
    this.stockControl = new FormControl(this.inputItem.stock);
    this.categoriesControl = new FormControl(this.inputItem.categories);
    this.barcodeControl = new FormControl(this.inputItem.barcode);
    this.articleControl = new FormControl(this.inputItem.article);
    this.nameControl = new FormControl(this.inputItem.name);
    this.countControl = new FormControl(this.inputItem.count);
    this.priceWithoutNDSControl = new FormControl(this.inputItem.priceWithoutNDS);
    this.ndsCountControl = new FormControl(this.inputItem.ndsCount);
    this.priceWithNDSControl = new FormControl(this.inputItem.priceWithNDS);
    this.priceViewControl = new FormControl(this.inputItem.priceView);
    this.priceRetailWithNDSControl = new FormControl(this.inputItem.priceRetailWithNDS);
    this.priceView2Control = new FormControl(this.inputItem.priceView2);
    this.priceRetailWithNDSFullControl = new FormControl(this.inputItem.priceRetailWithNDSFull);
    this.priceView3Control = new FormControl(this.inputItem.priceView3);
    this.unitsControl = new FormControl(this.inputItem.units);
    this.customerControl = new FormControl(this.inputItem.customer);

    this.itemFormGroup = new FormGroup({
      stock: this.stockControl,
      categories: this.categoriesControl,
      barcode: this.barcodeControl,
      article: this.articleControl,
      name: this.nameControl,
      count: this.countControl,
      priceWithoutNDS: this.priceWithoutNDSControl,
      ndsCount: this.ndsCountControl,
      priceWithNDS: this.priceWithNDSControl,
      priceView: this.priceViewControl,
      priceRetailWithNDS: this.priceRetailWithNDSControl,
      priceView2: this.priceView2Control,
      priceRetailWithNDSFull: this.priceRetailWithNDSFullControl,
      priceView3: this.priceView3Control,
      units: this.unitsControl,
      customer: this.customerControl
    });
    this.itemFormGroup.patchValue(this.inputItem);
  }

  saveAction() {
      this.updateItemEmitter.emit(this.itemFormGroup.value);
  }

  cancelAction() {
      this.cancelItemEmitter.emit()
  }
}
