import {createAction, props} from "@ngrx/store";

export const login = createAction(
  '[Auth] Auth Login',
  props<{
    email: string,
    userId: string,
    token: string,
    expirationDate: Date
  }>()
)

export const logout = createAction(
  '[Auth] Auth Logout'
)
