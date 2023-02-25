import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownDirective} from './directives/dropdown.directive';
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthComponent} from './auth/auth.component';
import {LoadSpinnerComponent} from './shared/load-spinner/load-spinner.component';
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import {AlertComponent} from './shared/alert/alert.component';
import {RecipesModule} from "./recipes/recipes.module";
import {ShoppingListModule} from "./shopping-list/shopping-list.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    AuthComponent,
    LoadSpinnerComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RecipesModule,
    ShoppingListModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, multi:true, useClass:AuthInterceptorService
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
