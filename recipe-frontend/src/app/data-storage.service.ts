import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Recipe} from "./model/recipe";
import {RecipeService} from "./recipes/recipe.service";
import {map, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private client: HttpClient, private recipeService: RecipeService) {
  }

  fetchData(): Observable<Recipe[]> {
    return this.client.get<Recipe[]>(
      'https://ng-recipe-app-f3b76-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
      .pipe(
        map((recipes) => {
          return recipes.map(
            (recipe) => {
              return {
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : []
              }
            })
        }),
        tap((recipes) => this.recipeService.setRecipes(recipes))
      )
  }

  saveData() {
    const recipeList = this.recipeService.getRecipeList();

    this.client.put<Recipe[]>(
      'https://ng-recipe-app-f3b76-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipeList
    ).subscribe(() => console.log('Saved all Recipes'))
  }
}
