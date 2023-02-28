import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../model/ingredient";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";

import * as fromShoppingList from "./store/shopping-list.reducer";
import * as ShoppingListActions from "./store/shopping-list.actions"

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredientsList?: Observable<{ ingredients: Ingredient[] }>

  constructor(private store: Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {
    this.ingredientsList = this.store.select('shoppingList')
  }

  onEditItem(id: number) {
    this.store.dispatch(ShoppingListActions.startEdit(
      { index: id }
      )
    )
  }
}
