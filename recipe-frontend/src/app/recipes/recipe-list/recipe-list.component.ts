import {Component, EventEmitter, Output} from '@angular/core';
import {Recipe} from "../../model/recipe";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipeList:Array<Recipe> = [
    new Recipe("Test Recipe", "Lorem Ipsum", "https://img.taste.com.au/p9uvLZX4/taste/2010/01/basic-scones_1980x1320-118375-1.jpg"),
    new Recipe("A different Recipe", "Lorem Ipsum", "https://img.taste.com.au/p9uvLZX4/taste/2010/01/basic-scones_1980x1320-118375-1.jpg")
  ]

  @Output() recipeSelected = new EventEmitter<Recipe>()

  onRecipeSelected(selectedRecipe:Recipe) {
    this.recipeSelected.emit(selectedRecipe)
  }

}
