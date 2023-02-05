import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../model/ingredient";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput',{static:false}) nameInputRef!: ElementRef
  @ViewChild('amountInput',{static:false}) amountInputRef!: ElementRef
  @Output() shopOutput = new EventEmitter<Ingredient>()

  addToShoppingList() {
    const ingredient = new Ingredient(
      this.nameInputRef.nativeElement.value,
      this.amountInputRef.nativeElement.value
    )

    this.shopOutput.emit(ingredient)
  }
}
