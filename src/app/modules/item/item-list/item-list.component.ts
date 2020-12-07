import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ItemModel } from 'app/core/models/item.model';
import { ItemDBService } from 'app/core/services/lowdb/item.lowdb.service';
import { MatPaginator } from '@angular/material/paginator';

const ELEMENT_DATA: ItemModel[] = [
  new ItemModel()
];
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = ['id', 'sku', 'name'];
  public dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private itemDBService: ItemDBService,
  ) { }

  ngOnInit(): void {
    console.log( this.itemDBService.get());
    this.dataSource.data =   this.itemDBService.get();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
