import {Action, createReducer, on} from "@ngrx/store";
import {Recipe} from "../../model/recipe";
import * as RecipeActions from "./recipe.actions"

export interface State {
  recipes: Array<Recipe>
}

const initialState: State = {
  recipes: []
}

const _recipeReducer = createReducer(
  initialState,
  on(
    RecipeActions.setRecipes,
    (state, action) => ({
      ...state,
      recipes: [ ...action.recipes ]
    })
  ),
  on(
    RecipeActions.addRecipe,
    (state,action) => ({
      ...state,
        recipes: state.recipes.concat({ ...action.recipe })
    })
  ),
  on(
    RecipeActions.updateRecipe,
    (state, action) => ({
      ...state,
      recipes: state.recipes.map(
        (recipe,index) => index == action.index ? { ...action.recipe } : recipe
      )
    })
  ),
  on(
    RecipeActions.deleteRecipe,
    (state,action) => ({
      ...state,
      recipes: state.recipes.filter(
        (_,index) => index !== action.index
      )
    })
  )
)

export function recipeReducer(state:State | undefined, action:Action) {
  return _recipeReducer(state,action)
}
