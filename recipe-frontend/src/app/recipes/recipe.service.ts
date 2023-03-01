import {Injectable} from '@angular/core';
import {Recipe} from "../model/recipe";
import {Ingredient} from "../model/ingredient";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";
import * as fromRoot from "../store/app.reducer"

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesUpdated = new Subject<Recipe[]>()

  private recipeList: Array<Recipe> = []

  constructor(private store: Store<fromRoot.AppState>) { }

  addIngredients(ingredients: Array<Ingredient>) {
    this.store.dispatch(ShoppingListActions.addIngredients({ ingredients }))
  }

  getRecipeList() {
    return this.recipeList.slice()
  }

  getRecipeById(index: number): Recipe {
    return this.recipeList[index]
  }

  updateRecipe(id: number, recipe: Recipe) {
    this.recipeList[id] = recipe
    this.recipesUpdated.next(this.recipeList.slice())
  }

  addRecipe(recipe: Recipe) {
    this.recipeList.push(recipe)
    this.recipesUpdated.next(this.recipeList.slice())
  }

  deleteRecipe(recipeId: number) {
    this.recipeList.splice(recipeId, 1)
    this.recipesUpdated.next(this.recipeList.slice())
  }

  setRecipes(recipes: Recipe[]) {
    this.recipeList = recipes
    this.recipesUpdated.next(this.recipeList.slice())
  }
}
