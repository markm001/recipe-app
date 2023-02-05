import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Recipe} from "../../../model/recipe";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input('recipeItem') recipe!:Recipe
  @Output() recipeSelected = new EventEmitter<void>()

  onRecipeSelected() {
    this.recipeSelected.emit()
  }
}
