import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "../model/recipe";
import {map, Observable, of, switchMap, take} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromRoot from "../store/app.reducer";
import * as RecipeActions from "./store/recipe.actions"
import {Actions, ofType} from "@ngrx/effects";

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<{ recipes: Recipe[] }> {
  constructor(private store:Store<fromRoot.AppState>, private actions$: Actions) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<{ recipes: Recipe[]}> | Promise<{ recipes: Recipe[]}> | { recipes: Recipe[]} {

    return this.store.select('recipes').pipe(
      take(1),
      map(recipesState => {
        return recipesState.recipes;
      }),
      switchMap(recipes => {
        if (recipes.length === 0) {
          this.store.dispatch(RecipeActions.fetchRecipes());
          return this.actions$.pipe(
            ofType(RecipeActions.setRecipes),
            take(1)
          );
        } else {
          return of({ recipes });
        }
      })
    );
  }
}
