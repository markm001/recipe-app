import { Component } from '@angular/core';
import {Ingredient} from "../model/ingredient";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredientsList: Array<Ingredient> = [
    new Ingredient("Ingredient", 42),
    new Ingredient("Ingredient-2", 12)
  ]

  onAddShoppingList(ingredient:Ingredient) {
    this.ingredientsList.push( new Ingredient( ingredient.name, ingredient.amount) )
  }
}
