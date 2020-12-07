import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-loading-data',
  templateUrl: './loading-data.component.html',
  styleUrls: ['./loading-data.component.scss']
})
export class LoadingDataComponent implements OnInit {
  @Input() public isShow: boolean = false;

  constructor(
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {

  }

}
