import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from "../model/recipe";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>()

  private recipeList:Array<Recipe> = [
    new Recipe("Test Recipe", "Lorem Ipsum", "https://img.taste.com.au/p9uvLZX4/taste/2010/01/basic-scones_1980x1320-118375-1.jpg"),
    new Recipe("A different Recipe", "Lorem Ipsum", "https://img.taste.com.au/p9uvLZX4/taste/2010/01/basic-scones_1980x1320-118375-1.jpg")
  ]


  //will return a copy of the array,instead of direct reference
  getRecipeList() {
    return this.recipeList.slice()
  }
}
