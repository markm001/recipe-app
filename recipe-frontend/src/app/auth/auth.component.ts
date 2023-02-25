import {Component, OnDestroy, ViewChild, ViewContainerRef} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponse, AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AlertComponent} from "../shared/alert/alert.component";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  isLogin = true
  isLoading = false
  error!:string | null

  closedSubscription!:Subscription

  constructor(private authService: AuthService,
              private router:Router,
              private containerRef:ViewContainerRef) { }

  switchMode() {
    this.isLogin = !this.isLogin
  }

  getModeLabel(): string {
    return this.isLogin ? 'Login' : 'Sign up'
  }

  onFormSubmit(form: NgForm) {
    if(!form.valid) {
      return
    }

    const email = form.value.email;
    const password = form.value.password;
    let authObservable:Observable<AuthResponse>

    this.isLoading = true

    if(this.isLogin) {
      authObservable = this.authService.login(email, password)
    } else {
      authObservable = this.authService.signUp(email, password)
    }

    authObservable.subscribe({
      next: (response) => {
        console.log(response)
        this.router.navigate(['/recipes']).then()
        this.isLoading = false
      },
      error: message => {
        // this.error = message
        this.showErrorAlert(message)

        this.isLoading = false
      }
    })

    form.reset()
  }

  onErrorHandle() {
    this.error = null
  }

  private showErrorAlert(message: string) {
    const componentRef = this.containerRef.createComponent(AlertComponent);
    componentRef.instance.message = message
    this.closedSubscription = componentRef.instance.closed.subscribe(()=>{
      this.closedSubscription.unsubscribe()
      this.containerRef.clear()
    });
  }

  ngOnDestroy(): void {
    if(this.closedSubscription) {
      this.closedSubscription.unsubscribe()
    }
  }
}
