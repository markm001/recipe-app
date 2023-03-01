import {Action, createReducer, on} from "@ngrx/store";
import {User} from "../user.model";
import * as AuthActions from "../store/auth.actions"

export interface State {
  user: User | null
}

const initialState: State = {
  user: null
}

export const _authReducer = createReducer(
  initialState,
  on(
    AuthActions.login,
    (state,action) => ({
      ...state,
      user: new User(
        action.email,
        action.userId,
        action.token,
        action.expirationDate
      )
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
