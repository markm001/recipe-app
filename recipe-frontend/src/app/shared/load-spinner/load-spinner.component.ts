import { Component } from '@angular/core';

@Component({
  selector: 'app-load-spinner',
  template: '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>',
  styleUrls: ['./load-spinner.component.css']
})
export class LoadSpinnerComponent { }
