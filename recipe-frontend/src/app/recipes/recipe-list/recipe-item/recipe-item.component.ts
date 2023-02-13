import {Component, Input} from '@angular/core';
import {Recipe} from "../../../model/recipe";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input('recipeItem') recipe!: Recipe
  @Input() itemIndex! :number
}
