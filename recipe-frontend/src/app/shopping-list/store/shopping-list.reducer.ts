import {Ingredient} from "../../model/ingredient";
import {Action, createReducer, on} from "@ngrx/store";

import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[],
  editedIngredient: Ingredient | null,
  editedIngredientIndex: number
}

const initialState: State = {
  ingredients: [
    new Ingredient('Ingredient 1', 4),
    new Ingredient('Ingredient 2', 3)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
}

const _shoppingListReducer = createReducer(
  initialState,
  on(
    ShoppingListActions.addIngredient,
    (state, action) => ({
      ...state,
      ingredients: state.ingredients.concat(action.ingredient)
    })
  ),
  on(
    ShoppingListActions.addIngredients,
    (state, action) => ({
      ...state,
      ingredients: state.ingredients.concat(...action.ingredients)
    })
  ),
  on(
    ShoppingListActions.updateIngredient,
    (state, action) =>({
      ...state,
      editedIngredientIndex: -1,
      ingredients: state.ingredients.map(
        (ingredient, index) =>
          index === state.editedIngredientIndex ? { ...action.ingredient } : ingredient
      )
      })
  ),
  on(
    ShoppingListActions.deleteIngredient,
    (state) =>({
      ...state,
      editedIngredientIndex: -1,
      ingredients: state.ingredients.filter(
        (_, index:number) => {
          return index !== state.editedIngredientIndex
        }
      )
    })
  ),
  on(
    ShoppingListActions.startEdit,
    (state, action) => ({
      ...state,
      editedIngredientIndex: action.index
    })
  ),
  on(
    ShoppingListActions.stopEdit,
    (state) => ({
      ...state,
      editedIngredient: null,
      editedIngredientIndex: -1
    })
  )
)

export function shoppingListReducer(state: State | undefined, action: Action) {
  return _shoppingListReducer(state,action)
}
