import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from "../model/ingredient";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  //Inform components of updated IngredientsList:
  ingredientsListUpdated = new EventEmitter<Array<Ingredient>>()

  private ingredientsList: Array<Ingredient> = [
    new Ingredient("Ingredient", 42),
    new Ingredient("Ingredient-2", 12)
  ]

  getIngredientsList() {
    return this.ingredientsList.slice()
  }

  addToIngredientsList(ingredient:Ingredient) {
    this.ingredientsList.push( new Ingredient( ingredient.name, ingredient.amount) )

    this.ingredientsListUpdated.emit(this.ingredientsList.slice())
  }

  addAllToIngredientsList(ingredients: Array<Ingredient>) {
    //spread operator -> add every item to the Ingredients Array
    this.ingredientsList.push(...ingredients)
    this.ingredientsListUpdated.emit(this.ingredientsList.slice())
  }
}
