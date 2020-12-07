import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  public itemFormGroup: FormGroup;
  public nameControl: FormControl = new FormControl('name');

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.itemFormGroup = new FormGroup({
      name: this.nameControl
    });
  }
}
