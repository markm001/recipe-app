import {Ingredient} from "../model/ingredient";
import {Action, createAction, createReducer, on, props} from "@ngrx/store";

const initialState = {
  ingredients: [
    new Ingredient('Ingredient 1', 4),
    new Ingredient('Ingredient 2', 3)
  ]
}

const addIngredient = createAction(
  '[Shopping List] Add Ingredient',
  props<{
    ingredients: Array<Ingredient>
  }>()
)

const _shoppingListReducer = createReducer(
  initialState,
  on(
    addIngredient,
    (state, action) => ({
      ...state,
      ingredients: state.ingredients.concat(action.ingredients)
    })
  )
)

export function shoppingListReducer(
  state: { ingredients: Ingredient[] } | undefined,
  action: Action) {
  return _shoppingListReducer(state,action)
}
