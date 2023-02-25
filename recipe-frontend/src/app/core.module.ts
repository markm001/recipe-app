import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";

@NgModule({
  providers: [{
    provide: HTTP_INTERCEPTORS, multi:true, useClass:AuthInterceptorService
  }]
})
export class CoreModule { }
