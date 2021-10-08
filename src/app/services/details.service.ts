import { Injectable } from '@angular/core';

@Injectable()
export class DetailsService {
  toggleValue!: string;
  constructor() { }

  get user():string{
    return this.toggleValue;
  }
  set user(val: string){
    this.toggleValue = val;
  }

}
