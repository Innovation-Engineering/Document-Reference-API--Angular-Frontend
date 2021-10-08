import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ToggleDetailsService} from "../../services/toggle-details.service";
/**
 * @title Inputs in a form
 */

@Component({
  selector: 'form-loader',
  templateUrl: 'form-loader.component.html',
  styleUrls: ['details-form.component.css'],
})
export class FormLoaderComponent implements OnInit, OnDestroy {
  toggleOption!: string;
  subscription!: Subscription;

  constructor(private toggleDetailsService: ToggleDetailsService) { }
  ngOnInit() {
    this.subscription = this.toggleDetailsService.view.subscribe(message => this.toggleOption = message)
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
