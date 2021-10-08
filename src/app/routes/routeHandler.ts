import {Router, RouterModule, Routes} from "@angular/router";
import { NgModule } from '@angular/core';
import {AppComponent} from "../app.component";
import {TableComponent} from "../components/forms/tables/table.component";
import {DetailsFormComponent} from "../components/forms/details-form.component";
import {ButtonControls} from "../components/button.component";

const routes: Routes = [
  // {path: 'home', component: DetailsFormComponent},
  // {path: 'create', component: DetailsFormComponent},
  // {path: 'edit', component: DetailsFormComponent},
  // {path: 'delete', component: DetailsFormComponent}
];

export const routing = RouterModule.forRoot(routes);

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
