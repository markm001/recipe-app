import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') displayed:boolean = false

  constructor(private element:ElementRef) { }

  @HostListener('document:click', ['$event']) toggleOpen(event:Event) {
    this.displayed = this.element.nativeElement.contains(event.target) ? !this.displayed : false
  }
}
