import {Component, Input, OnInit} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {Embedded, User, Users} from "../../../domain/reference-api.interface";
import {UserService} from "../../../services/user.service";
import {MatTableDataSource} from "@angular/material/table";

export declare enum MatTableFilter {
  EQUALS = "EQUALS",
  ANYWHERE = "ANYWHERE",
  STARTS_WITH = "STARTS_WITH",
  ENDS_WITH = "ENDS_WITH"
}

@Component({
  selector: 'table-component',
  styleUrls: ['table.component.css'],
  templateUrl: 'table.component.html',
})
export class TableComponent implements OnInit {
  @Input() sector?:string;
  tableColumns: string[] = ['firstName', 'userType', 'reportsTo', 'email', 'id'];
  filterEntity!: User[];
  dataSource!:TableDataSource;
  constructor(private userService:UserService) {
  }
  ngOnInit() {
    let users:User[] | undefined;
    this.userService.getEmbeddedObject(this.sector).subscribe(value => {
        // @ts-ignore
      users = (value['_embedded']['users']) as User[];
      this.dataSource = new TableDataSource(users);
    });
  }
  setupFilter(column: string) {
    this.dataSource.filterPredicate = (d: User, filter: string) => {
      // @ts-ignore
      const textToSearch = d[column] && d[column].toLowerCase() || '';
      return textToSearch.indexOf(filter) !== -1;
    };
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addData() {
    // const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    // this.dataToDisplay = [
    //   ...this.dataToDisplay,
    //   ELEMENT_DATA[randomElementIndex]
    // ];
    // this.dataSource.setData(this.dataToDisplay);
  }

  removeData() {
    // this.dataToDisplay = this.dataToDisplay.slice(0, -1);
    // this.dataSource.setData(this.dataToDisplay);
  }
}

class TableDataSource extends MatTableDataSource<User> {
  private _dataStream = new BehaviorSubject<User[]>([]);
  users: User[] | undefined;
  constructor(users:User[]) {
    super();
    console.log(users);
    this.setData(users);
  }
  _filterData(data: User[]): User[] {
    return super._filterData(data);
  }

  connect(): BehaviorSubject<User[]> {
    return this._dataStream;
  }
  disconnect() {}

  setData(users: User[]) {
    this._dataStream.next(users);
  }
}
