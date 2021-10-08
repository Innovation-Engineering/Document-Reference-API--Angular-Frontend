import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class ToggleDetailsService {
  private renderView = new BehaviorSubject('Home');
  view = this.renderView.asObservable();
  toggleView(newView: string) {
    this.renderView.next(newView);
  }
  toggle?: any[];
  constructor() { }
  get data(): any{
    return this.toggle;
  }
  set data(val: any){
    this.toggle = val;
    console.log(this.toggle);
  }
}
