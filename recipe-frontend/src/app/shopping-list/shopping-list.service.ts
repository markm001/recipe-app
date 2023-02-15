import {Injectable} from '@angular/core';
import {Ingredient} from "../model/ingredient";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  //Inform components of updated IngredientsList:
  ingredientsListUpdated = new Subject<Array<Ingredient>>()

  private ingredientsList: Array<Ingredient> = [
    new Ingredient("Ingredient", 42),
    new Ingredient("Ingredient-2", 12)
  ]

  getIngredientsList() {
    return this.ingredientsList.slice()
  }

  addToIngredientsList(ingredient:Ingredient) {
    this.ingredientsList.push( new Ingredient( ingredient.name, ingredient.amount) )

    this.ingredientsListUpdated.next(this.ingredientsList.slice())
  }

  addAllToIngredientsList(ingredients: Array<Ingredient>) {
    //spread operator -> add every item to the Ingredients Array
    this.ingredientsList.push(...ingredients)
    this.ingredientsListUpdated.next(this.ingredientsList.slice())
  }
}
