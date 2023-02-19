import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../model/ingredient";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

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
  editItem!:Ingredient

  constructor(private shoppingService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.editSubscription = this.shoppingService.startedEditing.subscribe(
      (id: number) => {
        this.editMode = true
        this.editItemId = id
        this.editItem = this.shoppingService.getIngredientById(id)

        this.shoppingForm.setValue({
          'nameInput':this.editItem.name,
          'amountInput':this.editItem.amount,
        })
      })
  }

  onSubmitShoppingList() {
    const ingredient = new Ingredient(
      this.shoppingForm.value.nameInput,
      this.shoppingForm.value.amountInput
    )

    if(this.editMode) {
      this.shoppingService.updateIngredientsList(this.editItemId, ingredient)
    } else {
      this.shoppingService.addToIngredientsList(ingredient)
    }

    this.resetForm();
  }
  onClear() {
    this.resetForm()
  }
  onDelete() {
    this.shoppingService.deleteItemById(this.editItemId)
    this.resetForm()
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe()
  }
  private resetForm() {
    this.editMode = false
    this.shoppingForm.reset()
  }
}
