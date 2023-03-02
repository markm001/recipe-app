import {createAction, props} from "@ngrx/store";

export const signUpStart = createAction(
  '[Auth] Sign Up Start',
  props<{
    email: string,
    password: string
  }>()
)

export const loginStart = createAction(
  '[Auth] Login Start',
  props<{
    email: string,
    password: string
  }>()
)

//Authenticate handle both Sign-up & Login cases
export const authenticateSuccess = createAction(
  '[Auth] Login Success',
  props<{
    email: string,
    userId: string,
    token: string,
    expirationDate: Date
  }>()
)

export const authenticateFail = createAction(
  '[Auth] Login Failure',
  props<{
    errorMessage: string
  }>()
)

export const clearError = createAction(
  '[Auth] Clear Error'
)

export const autoLogin = createAction(
  '[Auth] Auto Login'
)

export const logout = createAction(
  '[Auth] Logout'
)
