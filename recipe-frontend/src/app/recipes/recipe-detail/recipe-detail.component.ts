import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../model/recipe";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../store/app.reducer";
import * as RecipeActions from "../store/recipe.actions"
import {map, switchMap} from "rxjs";
import * as ShoppingActions from "../../shopping-list/store/shopping-list.actions"

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  currentRecipe!: Recipe
  recipeId!:number

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.AppState>
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap( params => {
        this.recipeId = +params['id']
        return this.store.select('recipes')
      }),
      map( state => {
        return state.recipes.find((_, index) => {
          return index === this.recipeId
        })
      })
    ).subscribe(recipe => {
      this.currentRecipe = recipe!
      }
    )
  }

  addToShoppingList() {
    this.store.dispatch(ShoppingActions.addIngredients({
      ingredients: this.currentRecipe.ingredients
    }))
  }

  editRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route}).then()
  }

  deleteRecipe() {
    this.store.dispatch(RecipeActions.deleteRecipe({
      index: this.recipeId
    }))

    this.router.navigate(['/recipes']).then()
  }
}
