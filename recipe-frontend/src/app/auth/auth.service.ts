import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_KEY = 'Xzkvt8ma6rHokui2rBVNSirxmjr8alyr8vz78sa'
  user = new BehaviorSubject<User | null>(null)
  tokenExpirationTimer: any

  constructor(private client: HttpClient, private router:Router) { }

  signUp(email: string, password: string): Observable<AuthResponse> {
    return this.client.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.API_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleErrorResponse),
      tap({
        next: response => {
          this.handleUserLogin(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn
          )
        }
      })
    )
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.client.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.API_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleErrorResponse),
      tap({
        next: response => {
          this.handleUserLogin(response.email, response.localId, response.idToken, +response.expiresIn
          )
        }
      })
    )
  }

  private handleUserLogin(email:string, userId:string,token:string, expiresIn:number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const currentUser = new User(
      email,
      userId,
      token,
      expirationDate
    )
    this.user.next(currentUser)
    this.autoLogout(expiresIn * 1000) //in ms
    localStorage.setItem('userData', JSON.stringify(currentUser) ) //serialize JS-Object to string
  }

  private handleErrorResponse(response: HttpErrorResponse)
    : Observable<AuthResponse> {
    let message = 'An unknown error occurred.';

    if (!(response.error || response.error.error)) {
      return throwError(() => message)
    }

    switch (response.error.error.message) {
      case 'EMAIL_EXISTS':
        message = 'The email already exists.'
        break
      case 'INVALID_PASSWORD' || 'EMAIL_NOT_FOUND':
        message = 'The email or password is incorrect.'
        break
    }
    return throwError(() => message)
  }

  autoLogin() {
    const userData:{
      email:string,
      id:string,
      _token:string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData')!);
    if(!userData) {
      return
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    )

    if(loadedUser.token) {
      this.user.next(loadedUser)

      //calc remaining time until expiration : (timeOfExpiration - now) in ms
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration)
    }
  }

  autoLogout(expirationDuration:number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout()
    }, expirationDuration);
    console.log(expirationDuration)
  }

  logout() {
    this.user.next(null)
    this.router.navigate(['/auth']).then()

    localStorage.removeItem('userData')

    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null
  }
}

export interface AuthResponse {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string

  registered?: string
}
