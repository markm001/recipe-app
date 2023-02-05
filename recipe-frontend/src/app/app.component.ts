import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayedComponent:string = 'recipes'

  onDisplayComponent(component:string) {
    this.displayedComponent = component
  }
}
