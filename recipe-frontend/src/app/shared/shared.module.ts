import {NgModule} from '@angular/core';
import {DropdownDirective} from "./directives/dropdown.directive";
import {LoadSpinnerComponent} from "./load-spinner/load-spinner.component";
import {AlertComponent} from "./alert/alert.component";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    DropdownDirective,
    LoadSpinnerComponent,
    AlertComponent
  ],
  imports: [CommonModule],
  exports: [
    DropdownDirective,
    LoadSpinnerComponent,
    AlertComponent,
    CommonModule
  ]
})
export class SharedModule { }
