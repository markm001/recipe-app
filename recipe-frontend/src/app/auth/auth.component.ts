import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {AlertComponent} from "../shared/alert/alert.component";
import {Store} from "@ngrx/store";
import * as fromRoot from "../store/app.reducer"
import * as AuthActions from "./store/auth.actions"

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLogin = true
  isLoading = false
  error!: string | null

  closedSubscription!: Subscription
  storeSubscription!: Subscription

  constructor(private containerRef: ViewContainerRef, private store: Store<fromRoot.AppState>) { }

  ngOnInit(): void {
    this.storeSubscription = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading
      this.error = authState.authError

      if(this.error) {
        this.showErrorAlert(this.error)
      }
    })
  }

  switchMode() {
    this.isLogin = !this.isLogin
  }

  getModeLabel(): string {
    return this.isLogin ? 'Login' : 'Sign up'
  }

  onFormSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true

    if (this.isLogin) {
      this.store.dispatch(AuthActions.loginStart({ email, password }))
    } else {
      this.store.dispatch(AuthActions.signUpStart({ email, password }))
    }

    form.reset()
  }

  private showErrorAlert(message: string) {
    const componentRef = this.containerRef.createComponent(AlertComponent);
    componentRef.instance.message = message
    this.closedSubscription = componentRef.instance.closed.subscribe(() => {
      this.store.dispatch(AuthActions.clearError())
      this.closedSubscription.unsubscribe()
      this.containerRef.clear()
    });
  }

  ngOnDestroy(): void {
    if(this.closedSubscription) {
      this.closedSubscription.unsubscribe()
    }
    this.storeSubscription.unsubscribe()
  }
}
