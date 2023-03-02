import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import * as AuthActions from "./store/auth.actions"
import * as fromRoot from "../store/app.reducer"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenExpirationTimer: any

  constructor(private store: Store<fromRoot.AppState>) { }

  setLogoutTimer(expirationDuration:number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(AuthActions.logout())
    }, expirationDuration);
    console.log(expirationDuration)
  }

  clearLogoutTimer() {
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
  }

}
