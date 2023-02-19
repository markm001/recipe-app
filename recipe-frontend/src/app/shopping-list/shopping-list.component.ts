import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../model/ingredient";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredientsList!: Array<Ingredient>
  private ingredientsChangedSubscription!: Subscription;

  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredientsList = this.shoppingService.getIngredientsList()
    this.ingredientsChangedSubscription = this.shoppingService.ingredientsListUpdated.subscribe(
      (list: Array<Ingredient>) => this.ingredientsList = list
    );
  }

  ngOnDestroy(): void {
    this.ingredientsChangedSubscription.unsubscribe()
  }

  onEditItem(id: number) {
    this.shoppingService.startedEditing.next(id)
  }
}
