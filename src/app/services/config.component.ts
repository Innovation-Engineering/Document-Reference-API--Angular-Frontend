import { Component } from '@angular/core';
import {ConfigService, UsersItr} from './config.service';
import {Embedded, Users} from "../domain/reference-api.interface";


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  providers: [ ConfigService ],
  styles: ['.error { color: #b30000; }']
})
export class ConfigComponent {
  error: any;
  headers: string[] = [];
  users: Users | undefined;
  usersItr: UsersItr | undefined;
  constructor(private configService: ConfigService) {}

  clear() {
    this.users = undefined;
    this.error = undefined;
    this.headers = [];
  }
  showConfig() {
    this.configService.getEmbeddedObject().subscribe(res => {
      // @ts-ignore
      let users = (res['_embedded']['users']) as Users[];
      for(const user of users){
        console.log(user.userType);
        console.log(user.email);
      }
    });
  }
  // showConfig() {
  //   this.configService.getConfig()
  //     .subscribe(
  //       (data: Embedded) => this.embedded = { ...data }, // success path
  //       error => this.error = error // error path
  //     );
  //   this.users = this.embedded?._embedded;
  // }

  showConfig_v1() {
    // this.configService.getConfig_1()
    //   .subscribe((data: Users) => this.users = {
    //     userType: data.userType,
    //     reportsTo: data.reportsTo,
    //     email:data.email,
    //     details:data.details
    //   });
    // _embedded: data._embedded,
    //   _links: data._links,
    //   _page: data._page
  }

  // showConfig_v2() {
  //   this.configService.getConfig()
  //     // clone the data object, using its known Config shape
  //     .subscribe((data: Users) => this.users = { ...data });
  // }

  showConfigResponse() {
    this.configService.getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `Config`.
        //this.users = { ...resp.body! };
      });
  }
  makeError() {
    this.configService.makeIntentionalError().subscribe(null, error => this.error = error );
  }

  getType(val: any): string {
    return val instanceof Date ? 'date' : Array.isArray(val) ? 'array' : typeof val;
  }
}
