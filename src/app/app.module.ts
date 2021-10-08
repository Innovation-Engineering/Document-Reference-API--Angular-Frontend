import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule, routing} from "./routes/routeHandler";
import { AppComponent } from './app.component';
import { RouterModule } from "@angular/router";
import { ButtonControls } from "./components/button.component";
import {DetailsFormComponent} from "./components/forms/details-form.component";
import {MaterialModule} from "./components/material.module";
import {ToggleDetailsService} from "./services/toggle-details.service";
import {FormLoaderComponent} from "./components/forms/form-loader.component";
import {ConfigComponent} from "./services/config.component";
import {UserService} from "./services/user.service";
import {OverviewComponent} from "./components/forms/overview.component";
import {ConfigService} from "./services/config.service";
import {TableComponent} from "./components/forms/tables/table.component";
import {TableLoaderComponent} from "./components/forms/tables/table-loader.component";



@NgModule({
  declarations: [
    AppComponent,
    ButtonControls,
    FormLoaderComponent,
    DetailsFormComponent,
    ConfigComponent,
    OverviewComponent,
    TableComponent,
    TableLoaderComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    ToggleDetailsService,
    ConfigService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
