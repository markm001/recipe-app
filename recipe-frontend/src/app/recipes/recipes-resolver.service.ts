import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "../model/recipe";
import {Observable} from "rxjs";
import {DataStorageService} from "../data-storage.service";
import {RecipeService} from "./recipe.service";

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private data: DataStorageService, private recipeService:RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    const recipes = this.recipeService.getRecipeList()

    return recipes.length === 0 ? this.data.fetchData() : recipes
  }
}
