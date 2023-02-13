import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from "../model/recipe";
import {Ingredient} from "../model/ingredient";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>()

  private recipeList: Array<Recipe> = [
    new Recipe("Blin",
      "Delicious, thin Blin, perfect for filling with Jam or Yoghurt.",
      "https://img.taste.com.au/p9uvLZX4/taste/2010/01/basic-scones_1980x1320-118375-1.jpg",
      [
        new Ingredient('Flour', 100),
        new Ingredient('Butter', 240),
        new Ingredient('Milk', 100),
        new Ingredient('Egg', 1)
      ]),
    new Recipe("French Toast",
      "Nice, toasty French Toast!",
      "https://img.taste.com.au/p9uvLZX4/taste/2010/01/basic-scones_1980x1320-118375-1.jpg",
      [
        new Ingredient('Toast', 6),
        new Ingredient('Milk', 200),
        new Ingredient('Egg', 2)
      ])
  ]

  constructor(private shoppingService:ShoppingListService) { }

  //will return a copy of the array,instead of direct reference
  getRecipeList() {
    return this.recipeList.slice()
  }

  addIngredients(ingredients: Array<Ingredient>) {
    this.shoppingService.addAllToIngredientsList(ingredients)
  }

  getRecipeById(index:number): Recipe {
    return this.recipeList[index]
  }
}
