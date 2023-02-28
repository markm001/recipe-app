import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../model/ingredient";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from "../store/shopping-list.actions";
import {State} from "../store/shopping-list.reducer";

import * as fromShoppingList from "../store/shopping-list.reducer";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shopForm', {static: false}) shoppingForm!: NgForm
  editSubscription!: Subscription
  editMode = false
  editItemId!:number
  editItem?:Ingredient | null

  constructor(private store: Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {
    this.editSubscription = this.store.select('shoppingList').subscribe(
      (stateData:State) => {
        const editIndex = stateData.editedIngredientIndex
        if(editIndex > -1) {
          this.editMode = true
          this.editItem = stateData.ingredients[editIndex]

          this.shoppingForm.setValue({
            'nameInput': this.editItem!.name,
            'amountInput': this.editItem!.amount,
          })
        } else {
          this.editMode = false
        }
      })
  }

  onSubmitShoppingList() {
    const ingredient = new Ingredient(
      this.shoppingForm.value.nameInput,
      this.shoppingForm.value.amountInput
    )

    if(this.editMode) {
      this.store.dispatch(ShoppingListActions.updateIngredient(
        { ingredient: ingredient }
      ))
    } else {
      this.store.dispatch(ShoppingListActions.addIngredient({ ingredient }))
    }

    this.onClear()
  }
  onDelete() {
    this.store.dispatch(ShoppingListActions.deleteIngredient())
    this.onClear()
  }
  onClear() {
    this.editMode = false
    this.shoppingForm.reset()
    this.store.dispatch(ShoppingListActions.stopEdit())
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe()
    this.store.dispatch(ShoppingListActions.stopEdit()) //reset the state
  }
}
