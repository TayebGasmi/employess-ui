import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AppLayoutModule} from "./layout/app.layout.module";
import {SharedModule} from "./module/shared/shared.module";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    SharedModule,
    ToastModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
