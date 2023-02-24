import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponse, AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLogin = true
  isLoading = false
  error?:string

  constructor(private authService: AuthService) { }

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
        this.isLoading = false
      },
      error: message => {
        this.error = message
        this.isLoading = false
      }
    })

    form.reset()
  }
}
