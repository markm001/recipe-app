import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as RecipeActions from "./recipe.actions"
import {map, switchMap, withLatestFrom} from "rxjs";
import {Recipe} from "../../model/recipe";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../store/app.reducer";

@Injectable()
export class RecipeEffects {
  constructor(private actions$: Actions, private client:HttpClient, private store:Store<fromRoot.AppState>) { }

  fetchRecipes$ = createEffect( () =>
    this.actions$.pipe(
      ofType(RecipeActions.fetchRecipes),
      switchMap( () => {
        return this.client.get<Recipe[]>(
          'https://ng-recipe-app-f3b76-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
      }),
      map((recipes) => {
        return recipes.map(
          (recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            }
          })
      }),
      map(recipes => RecipeActions.setRecipes({ recipes }))
    )
  )

  storeRecipes$ = createEffect(() =>
      this.actions$.pipe(
        ofType(RecipeActions.storeRecipes),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([_, state]) =>
          this.client.put(
            'https://ng-recipe-app-f3b76-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
            state.recipes
          )
        )
      ),
    { dispatch: false }
  )

}
