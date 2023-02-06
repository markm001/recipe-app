import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../model/ingredient";
import {ShoppingListService} from "./shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredientsList!: Array<Ingredient>

  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredientsList = this.shoppingService.getIngredientsList()
    this.shoppingService.ingredientsListUpdated.subscribe(
      (list:Array<Ingredient>) => this.ingredientsList = list
    )
  }
}
