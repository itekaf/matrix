import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ItemModel } from 'app/core/models/item.model';
import { ItemDBService } from 'app/core/services/lowdb/item.lowdb.service';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';

const ELEMENT_DATA: ItemModel[] = [
  new ItemModel()
];
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = ['id', 'sku', 'name'];
  public dataSource = new MatTableDataSource(ELEMENT_DATA);
  public expandedElement: ItemModel | null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private itemDBService: ItemDBService,
    private cdf: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.itemDBService.get();
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
