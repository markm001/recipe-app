import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../model/recipe";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  currentRecipe!: Recipe
  recipeId!:number

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) => {
        this.recipeId = +params['id'];
        this.currentRecipe = this.recipeService.getRecipeById(this.recipeId)
      }
    )
  }

  addToShoppingList() {
    this.recipeService.addIngredients(this.currentRecipe.ingredients)
  }

  editRecipe() {
    this.router.navigate(['edit'], {relativeTo:this.route})
    // this.router.navigate(['../', this.index, 'edit'], {relativeTo:this.route})
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeId)
    this.router.navigate(['/recipes'])
  }
}
