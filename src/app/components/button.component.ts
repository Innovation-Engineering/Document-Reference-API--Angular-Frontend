import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import {FormControl} from "@angular/forms";
import {ToggleDetailsService} from "../services/toggle-details.service";


/**
 * @title Basic buttons
 */
@Component({
  selector: 'button-controls',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.css']
})
export class ButtonControls implements OnInit , OnDestroy{
  subscription!: Subscription;
  toggleValue: string = "Home";
  constructor(public toggleDetailsService:ToggleDetailsService) {
  }
  ngOnInit() {
    this.subscription = this.toggleDetailsService.view.subscribe( toggleValue => this.toggleValue = toggleValue)
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  toggle(val: string){
    this.toggleValue = val;
    this.toggleDetailsService.toggleView(this.toggleValue);
  }
}
