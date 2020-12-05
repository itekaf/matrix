import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-item',
  templateUrl: './header-item.component.html',
  styleUrls: ['./header-item.component.scss']
})
export class HeaderItemComponent implements OnInit {
  @Input() public isMenuOpen: boolean = false;
  @Output() public onChangeStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  toggleMenu($event) {
    this.isMenuOpen = !this.isMenuOpen;
    this.onChangeStatus.emit(this.isMenuOpen);
  }

}
