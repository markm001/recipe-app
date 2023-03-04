import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "../../model/recipe";
import {ActivatedRoute, Router} from "@angular/router";
import {map, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../store/app.reducer";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Array<Recipe> | undefined
  subscription!: Subscription

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.AppState>
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('recipes')
      .pipe( map( (state) => state.recipes) )
      .subscribe((recipesList: Array<Recipe>)=> {
        this.recipes = recipesList
      })
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.activeRoute}).then()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
