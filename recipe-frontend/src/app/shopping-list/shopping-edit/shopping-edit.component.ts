import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../model/ingredient";
import {ShoppingListService} from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput',{static:false}) nameInputRef!: ElementRef
  @ViewChild('amountInput',{static:false}) amountInputRef!: ElementRef

  constructor(private shoppingService: ShoppingListService) { }

  addToShoppingList() {
    const ingredient = new Ingredient(
      this.nameInputRef.nativeElement.value,
      this.amountInputRef.nativeElement.value
    )

    this.shoppingService.addToIngredientsList(ingredient)
  }
}
