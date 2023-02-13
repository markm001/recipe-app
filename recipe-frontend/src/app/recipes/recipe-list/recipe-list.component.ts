import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../model/recipe";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Array<Recipe> | undefined

  constructor(
    private recipeService: RecipeService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit()
    :
    void {
    this.recipes = this.recipeService.getRecipeList()
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.activeRoute})
  }
}
