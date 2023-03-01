import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";
import {StoreModule} from '@ngrx/store';

import * as fromRoot from "../app/store/app.reducer"

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(fromRoot.appReducer)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
