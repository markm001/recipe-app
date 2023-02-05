import { Component } from '@angular/core';
import {Recipe} from "../model/recipe";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
  displayedRecipe!: Recipe
}
