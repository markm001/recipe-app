import {Component, Input} from '@angular/core';
import {Recipe} from "../../model/recipe";
import {Ingredient} from "../../model/ingredient";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() currentRecipe!:Recipe

  constructor(private recipeService:RecipeService) { }

  addToShoppingList() {
    this.recipeService.addIngredients(this.currentRecipe.ingredients)
  }
}
