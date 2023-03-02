import {Action, createReducer, on} from "@ngrx/store";
import {User} from "../user.model";
import * as AuthActions from "../store/auth.actions"

export interface State {
  user: User | null,
  authError: string | null,
  loading: boolean
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
}

export const _authReducer = createReducer(
  initialState,
  on(
    AuthActions.loginStart,
    (state, _) => ({
      ...state,
      authError: null,
      loading: true
    })
  ),
  on(
    AuthActions.authenticateSuccess,
    (state,action) => ({
      ...state,
      authError: null,
      user: new User(
        action.email,
        action.userId,
        action.token,
        action.expirationDate
      ),
      loading: false
    })
  ),
  on(
    AuthActions.authenticateFail,
    (state, action) => ({
      ...state,
      authError: action.errorMessage,
      user: null,
      loading: false
    })
  ),
  on(
    AuthActions.clearError,
    (state) => ({
      ...state,
      authError: null
    })
  ),
  on(
    AuthActions.logout,
    (state) => ({
      ...state,
      user: null
    })
  )
)

export function authReducer(state:State | undefined, action:Action) {
  return _authReducer(state, action)
}
