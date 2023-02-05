import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  title = 'Recipe Application'

  @Output() activeComponent = new EventEmitter<string>()

  onClickItem(selector:string) {
    this.activeComponent.emit(selector)
  }

}
