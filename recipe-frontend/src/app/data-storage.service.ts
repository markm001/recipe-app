import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Recipe} from "./model/recipe";
import {RecipeService} from "./recipes/recipe.service";
import {map, Observable, tap} from "rxjs";
import {Ingredient} from "./model/ingredient";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private client: HttpClient, private recipeService:RecipeService) { }

  fetchData(): Observable<Recipe[]> {
    return this.client.get<Recipe[]>(
      'https://ng-recipe-app-f3b76-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      {
        observe : 'body'
      }
    ).pipe( map( (recipes)=> {
        return recipes.map(
          (recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            }
        })
      })
    ).pipe(
      tap((recipes) => this.recipeService.setRecipes(recipes))
    )
  }

  saveData() {
    const recipeList = this.recipeService.getRecipeList();

    //Firebase-specific: put request to override all data under a Node:
    this.client.put<Recipe[]>(
      'https://ng-recipe-app-f3b76-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipeList
    ).subscribe(()=> console.log('Saved all Recipes'))
  }
}
