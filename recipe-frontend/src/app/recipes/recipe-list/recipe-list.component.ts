import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "../../model/recipe";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Array<Recipe> | undefined
  subscription!: Subscription

  constructor(
    private recipeService: RecipeService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit()
    :
    void {
    this.recipes = this.recipeService.getRecipeList()

    this.subscription = this.recipeService.recipesUpdated.subscribe(
      (recipesList: Array<Recipe>)=> {
        this.recipes = recipesList
      }
    );
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.activeRoute})
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
