import {Component, OnDestroy, OnInit} from "@angular/core";
import {ConfigService} from "../../services/config.service";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'overview-component',
  templateUrl: 'overview.component.html',
  styleUrls: ['overview.component.css'],
})
export class OverviewComponent implements OnInit{
  constructor(private configService:ConfigService) {

  }
  countMainAll:string = '';
  countMainBusiness:string = '';
  countMainMarketing:string = '';
  countMainSales:string = '';
  countWarnUnassigned:string = '';
  sectors:Array<string> = ['Business Development','Marketing','Sales'];
  ngOnInit() {
    this.getCountNoneAssigned();
    this.getCountAll();
    this.sectors.forEach(value => {
      this.getCountSector(value);
    })
  }
  tiles: Tile[] = [
    {text: 'main', cols: 3, rows: 1, color: '#D4F1F4'},
    {text: 'success', cols: 1, rows: 2, color: '#75E6DA'},
    {text: 'warn', cols: 1, rows: 1, color: '#189AB4'},
    {text: 'summary', cols: 2, rows: 1, color: '#EBEEF1'},
  ];
  getCountNoneAssigned(){
    return this.configService.getCountNoneAssigned().subscribe(count => {
      this.countWarnUnassigned = count.toString();
    });
  }
  getCountAll(){
    return this.configService.getCountAll().subscribe(count => {
      this.countMainAll = count.toString();
    });
  }
  getCountSector(sector:string){
    return this.configService.getCountSector(sector).subscribe(count => {
      switch (sector){
        case 'Business Development':
          this.countMainBusiness = count.toString();
          break;
        case 'Marketing':
          this.countMainMarketing = count.toString();
          break;
        case'Sales':
          this.countMainSales = count.toString();
          break;
      }
    });
  }
}
