import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
/**
 * @title Inputs in a form
 */

@Component({
  selector: 'table-loader',
  templateUrl: 'table-loader.component.html',
  styleUrls: ['table.component.css'],
})
export class TableLoaderComponent implements OnInit, OnDestroy {
  // toggleOption!: string;
  // subscription!: Subscription;

  constructor() { }
  ngOnInit() {
    // this.subscription = this.toggleDetailsService.view.subscribe(message => this.toggleOption = message)
  }
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
