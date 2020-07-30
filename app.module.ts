import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BikeStationsComponent } from './bike-stations/bike-stations.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ExampleInterceptor} from "./app.interceptor";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [
    AppComponent,
    BikeStationsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatTableModule,
    MatSortModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,
      useClass: ExampleInterceptor,
      multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
